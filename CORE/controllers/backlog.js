const { response, request } = require('express');
// eslint-disable-next-line no-unused-vars
const { Schema } = require('mongoose');

const UserStories = require('../models/userstories');
const Backlog = require('../models/backlog');
const Proyecto = require('../controllers/proyecto');


const backlogGet = async(req = request, res = response) => {
    const { limite = Number.MAX_SAFE_INTEGER, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, backlog] = await Promise.all([
        Backlog.countDocuments(query),
        Backlog.find(query)
        .populate('userstories')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        backlog
    })
}


const backlogGetByID = async(req = request, res = response) => {
    const { id } = req.params;
    const backlog = await Backlog.findById(id);
    res.json(backlog);
}

const backlogPost = async(req, res = response) => {
    const { userstories, nombre } = req.body;
    const userstorieEncontrado = await UserStories.find({ _id: { $in: userstories } })


    const data = {
        nombre,
        userstories: userstorieEncontrado.map((userstories) => userstories._id)
    }
    const backlog = new Backlog(data);
    await backlog.save();

    res.json({
        nombre,
        backlog
    })
}

const backlogPut = async(req, res = response) => {
    const { id } = req.params;
    const { userstories } = req.body;
    const userstorieEncontrado = await UserStories.find({ _id: { $in: userstories } })

    const data = {

        userstories: userstorieEncontrado.map((userstories) => userstories._id)
    }

    const backlog = await Backlog.findByIdAndUpdate(id, data, { new: true });
    res.json(backlog);
}


const backlogDelete = async(req, res = response) => {
    const { id } = req.params;
    const backlog = await Backlog.findByIdAndUpdate(id, { estado: false });
    res.json(backlog);
}

module.exports = {
    backlogPost,
    backlogGetByID,
    backlogPut,
    backlogGet,
    backlogDelete
}