const { response, request } = require('express');

const Proyecto = require('../models/proyecto');
const Usuario = require('../models/usuario');

const proyectosGet = async(req = request, res = response) => {
    const { limite = Number.MAX_SAFE_INTEGER, desde = 0 } = req.query;
    const query = { estado: true };

    const uid = req.query.uid;

    if (uid) {
        query._id = uid;
    }

    const proyectos = await getProjects(query, desde, limite);
    const total = await Proyecto.countDocuments(query);

    res.json({
        total,
        proyectos
    })
}

async function getProjects(query, desde, limite) {
    return new Promise((resolve, reject) => {
        Proyecto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuarios')
            .exec((err, populatedData) => {
                if (err) {
                    reject(error);
                    return false;
                }

                resolve(populatedData);
            });


    });
}

const proyectosGetByID = async(req, res = response) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id);
    res.json(proyecto);
}

//Crear
const proyectosPost = async(req, res = response) => {
    const { nombre_proyecto, descripcion, usuarios } = req.body;
    const usuariosEncontrados = await Usuario.find({ _id: { $in: usuarios } });

    const data = {
        nombre_proyecto,
        descripcion,
        usuarios: usuariosEncontrados.map((usuario) => usuario._id)
    }
    const proyecto = new Proyecto(data);
    await proyecto.save();

    res.json({
        proyecto
    });
}

//Modificar proyecto
const proyectosPut = async(req, res = response) => {
    const { id } = req.params;
    const { nombre_proyecto, descripcion, usuarios } = req.body
    const usuariosEncontrados = await Usuario.find({ _id: { $in: usuarios } });

    const data = {
        nombre_proyecto,
        descripcion,
        usuarios: usuariosEncontrados.map((usuario) => usuario._id)
    }

    const proyecto = await Proyecto.findByIdAndUpdate(id, data, { new: true });
    res.json(proyecto);

}


const proyectosDelete = async(req, res = response) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findByIdAndUpdate(id, { estado: false });

    res.json(proyecto);
}

module.exports = {
    proyectosGet,
    proyectosGetByID,
    proyectosPost,
    proyectosPut,
    proyectosDelete
}
