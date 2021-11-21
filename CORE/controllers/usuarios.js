const {response, request} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const Role = require('../models/role')

const usuariosGet = async (req = request, res = response) => {

    const {limite = Number.MAX_SAFE_INTEGER, desde = 0} = req.query;

    const query = {estado: true};
    const uid = req.query.uid;
    if (uid) {
        query._id = uid;
    }

    const usuarios = await getUsers(query, desde, limite);
    const total = await Usuario.countDocuments(query);

    res.json({
        total,
        usuarios
    });
}

async function getUsers(query, desde, limite) {
    return new Promise((resolve, reject) => {
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('rol')
            .exec((err, populatedData) => {
                if (err) {
                    reject(error);
                    return false;
                }

                resolve(populatedData);
            });


    });
}

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, rol} = req.body;

    const rolEncontrado = await Role.findOne({rol: {$in: rol}});
    const password = 'admin123';
    const usuario = new Usuario({nombre, correo, password, rol: rolEncontrado._id});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {nombre, correo, rol} = req.body;

    const rolEncontrado = await Role.findOne({rol: {$in: rol}});
    const request = new Usuario({_id: id, nombre, correo, rol: rolEncontrado._id});

    const usuario = await Usuario.findByIdAndUpdate(id, request);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

// Eliminado logico del usuario, se coloca con estado inactivo
const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
