const { response, request } = require('express');

const Proyecto = require('../models/proyecto');

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

const proyectosPost = async(req, res = response) => {
    const { nombre_proyecto, descripcion, miembros } = req.body;
    const proyecto = new Proyecto({ nombre_proyecto, descripcion, miembros });

    await proyecto.save();

    res.json({
        proyecto
    });
}


const proyectosDelete = async(req, res = response) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findByIdAndUpdate(id, { estado: false });

    res.json(proyecto);
}

module.exports = {
    proyectosGet,
    proyectosPost,
    proyectosDelete
}