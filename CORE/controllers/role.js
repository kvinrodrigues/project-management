const {response, request} = require('express');
const Rol = require('../models/role');
const Permiso = require('../models/permiso');

//Listar roles
const rolesGet = async (req = request, res = response) => {
    const {limite = Number.MAX_SAFE_INTEGER, desde = 0} = req.query;
    const query = {estado: true};

    const uid = req.query.uid;
    if (uid) {
        query._id = uid;
    }

    const [total, roles] = await Promise.all([
        Rol.countDocuments(query),
        Rol.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        roles
    })
}

//Crear un rol
const rolesPost = async (req, res = response) => {
    const rol = req.body.rol.toUpperCase();
    const permisos = req.body.permisos;
    const descripcion = req.body.descripcion;
    const rolDB = await Rol.findOne({rol});

    if (rolDB) {
        return res.status(400).json({
            msg: `El rol ${rolDB.rol}, ya existe`
        });
    }

    const permisosEncontrados = await Permiso.find({nombre_permiso: {$in: permisos}});

    //Generar la data para guardar
    const data = {
        rol,
        descripcion,
        permisos: permisosEncontrados.map((permiso) => permiso._id)
    }
    const role = new Rol(data);

    //Guardar en la DB

    await role.save();

    res.status(201).json(role);
}

//Modifica el rol
const rolesPut = async (req, res = response) => {
    const {id} = req.params;
    // eslint-disable-next-line no-unused-vars
    const {estado, ...data} = req.body;

    data.rol = data.rol.toUpperCase();

    const role = await Rol.findByIdAndUpdate(id, data, {new: true});

    res.json(role);
}

//El rol pasa a un estado de false
const rolesDelete = async (req, res = response) => {
    const {id} = req.params;
    const rolBorrado = await Rol.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(rolBorrado);
}

module.exports = {
    rolesGet,
    rolesPost,
    rolesPut,
    rolesDelete
}
