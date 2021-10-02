const { response, request } = require('express');
const Permiso = require('../models/permiso');


//Listar permisos
const permisosGet = async(req = request, res = response) => {
    const { limite = Number.MAX_SAFE_INTEGER, desde = 0 } = req.query;
    const query = { estado: true };
    const uid = req.query.uid;

    if (uid) {
        query.uid = uid;
    }

    const [total, permisos] = await Promise.all([
        Permiso.countDocuments(query),
        Permiso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        permisos
    })
}

//Crear un permiso
const permisosPost = async(req, res = response) => {
    const nombre_permiso = req.body.nombre_permiso.toUpperCase();
    const descripcion = req.body.descripcion;
    const permisoDB = await Permiso.findOne({ nombre_permiso });

    if (permisoDB) {
        return res.status(400).json({
            msg: `El permiso ${permisoDB.nombre_permiso}, ya existe`
        });
    }

    //Generar la data para guardar
    const data = {
        nombre_permiso,
        descripcion
    }
    const permiso = new Permiso(data);

    //Guardar en la DB

    await permiso.save();

    res.status(201).json(permiso);
}


const permisosPut = async(req, res = response) => {
    const { id } = req.params;
    const data = req.body;

    data.nombre_permiso = data.nombre_permiso.toUpperCase();

    const permiso = await Permiso.findByIdAndUpdate(id, data, { new: true });

    res.json(permiso);
}

const permisosDelete = async(req, res = response) => {
    const { id } = req.params;
    const permisoBorrado = await Permiso.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(permisoBorrado);
}

module.exports = {
    permisosGet,
    permisosPost,
    permisosPut,
    permisosDelete
}