const { response, request } = require('express');
// eslint-disable-next-line no-unused-vars
const { Schema } = require('mongoose');

const UserStories = require('../models/userstories');
const Proyecto = require('../models/proyecto');
const Sprint = require('../models/sprint');

const sprintGet = async(req, res = response) => {
    const { limite = Number.MAX_SAFE_INTEGER, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, sprint] = await Promise.all([
        Sprint.countDocuments(query),
        Sprint.find(query)
        .populate('proyecto')
        .populate('userstories')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        sprint
    })
}

const sprintGetByID = async(req, res = response) => {
    const { id } = req.params;
    const sprint = await Sprint.findById(id)
        .populate('proyecto')
        .populate('userstories')
    res.json(sprint);
}

const sprintPost = async(req, res = response) => {
    const { proyecto, userstories, fecha_inicio } = req.body;
    const sprintDB = await Sprint.findOne({ proyecto });
    if (sprintDB) {
        return res.status(400).json({
            msg: `Ya existe un sprint para el proyecto ${proyecto}`
        });
    }
    const data = {
        userstories,
        fecha_inicio,
        sprintDB
    }
    const sprint = new Sprint(data);

    await sprint.save();
    res.status(201).json(sprint);
}

const sprintPut = async(req, res = response) => {
    const { id } = req.params;
    const { proyecto, userstories, fecha_inicio } = req.body;
    const proyectoEncontrado = await Proyecto.find({ _id: { $in: proyecto } })
    const data = {
        userstories,
        fecha_inicio,
        proyecto: proyectoEncontrado.map((proyecto) => proyecto._id)
    }
    const sprint = await Sprint.findByIdAndUpdate(id, data, { new: true });
    res.json(sprint);
}

const sprintDelete = async(req, res = response) => {
    const { id } = req.params;
    const sprint = await Sprint.findByIdAndUpdate(id, { estado: false });
    res.json(sprint);
}

module.exports = {
    sprintGet,
    sprintGetByID,
    sprintPost,
    sprintPut,
    sprintDelete
}