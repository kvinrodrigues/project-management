const { response, request } = require('express');
// eslint-disable-next-line no-unused-vars
const { Schema } = require('mongoose');

const UserStories = require('../models/userstories');
const Proyecto = require('../models/proyecto');


const storiesGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, userstories] = await Promise.all([
        UserStories.countDocuments(query),
        UserStories.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        userstories
    })
}

const storiesPost = async(req, res = response) => {
    const { proyecto } = req.body;
    const proyectoEncontrado = await Proyecto.find({ nombre_proyecto: { $in: proyecto } })

    const data = {

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
    storiesPut,
    storiesGet,
    storiesDelete
}