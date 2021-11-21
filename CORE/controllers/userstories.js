const { response, request } = require('express');
// eslint-disable-next-line no-unused-vars
const { Schema } = require('mongoose');

const UserStories = require('../models/userstories');
const Proyecto = require('../models/proyecto');


const storiesGet = async(req = request, res = response) => {
    const { limite = Number.MAX_SAFE_INTEGER, desde = 0 } = req.query;
    const query = { estado: true };
    const proyecto = req.query.proyecto;
    const uid = req.query.uid;
    if (uid) {
        query._id = uid;
    }
    if (proyecto) {
        query.proyecto = proyecto;
    }


    const [total, userstories] = await Promise.all([
        UserStories.countDocuments(query),
        UserStories.find(query)
        .populate('proyecto')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        userstories
    })
}

const storiesGetByID = async(req, res = response) => {
    const { id } = req.params;
    const storie = await UserStories.findById(id)
        .populate('proyecto')
    res.json(storie);
}

const storiesPost = async(req, res = response) => {
    const { proyecto, ...body } = req.body;
    const proyectoEncontrado = await Proyecto.find({ nombre_proyecto: { $in: proyecto } })

    const data = {
        ...body,
        proyecto: proyectoEncontrado.map((proyecto) => proyecto._id)
    }
    const userStorie = new UserStories(data);
    await userStorie.save();

    res.json({
        userStorie
    })
}

const storiesPut = async(req, res = response) => {
    const { id } = req.params;
    const { proyecto } = req.body;
    const proyectoEncontrado = await Proyecto.find({ nombre_proyecto: { $in: proyecto } })

    const data = {

        proyecto: proyectoEncontrado.map((proyecto) => proyecto._id)
    }

    const userStorie = await UserStories.findByIdAndUpdate(id, data, { new: true });
    res.json(userStorie);
}


const storiesDelete = async(req, res = response) => {
    const { id } = req.params;
    const userStorie = await UserStories.findByIdAndUpdate(id, { estado: false });
    res.json(userStorie);
}

module.exports = {
    storiesPost,
    storiesGetByID,
    storiesPut,
    storiesGet,
    storiesDelete
}