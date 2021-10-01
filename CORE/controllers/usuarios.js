const {response, request} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const Role = require('../models/role')

const usuariosGet = async (req = request, res = response) => {

    const {limite = Number.MAX_SAFE_INTEGER, desde = 0} = req.query;

    let query;
    const uid = req.query.uid;
    if (uid) {
        query = {_id: req.query.uid};
    }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body;

    const rolEncontrado = await Role.findOne({rol: {$in: rol}});
    const usuario = new Usuario({nombre, correo, password, rol:rolEncontrado._id});

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
    const {_id, password, correo, ...resto} = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

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
