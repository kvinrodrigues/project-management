const { response, request } = require('express');
const { Schema } = require('mongoose');

const Proyecto = require('../models/proyecto');
const Usuario = require('../models/usuario');




const proyectosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, proyectos] = await Promise.all([
        Proyecto.countDocuments(query),
        Proyecto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        proyectos
    })
}

//Crear
const proyectosPost = async(req, res = response) => {
    const { nombre_proyecto, descripcion, usuarios } = req.body;
    const usuariosEncontrados = await Usuario.find({ correo: { $in: usuarios } });

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
    const usuariosEncontrados = await Usuario.find({ correo: { $in: usuarios } });

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
    proyectosPost,
    proyectosPut,
    proyectosDelete
}