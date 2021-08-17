const {response} = require('express')
const Role = require('../models/role')
const Permiso = require('../models/permiso');

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRole = (...permisos_requeridos) => {
    return async (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        const rolEncontrado = await Role.findOne({_id: {$in: req.usuario.rol.toString()}});
        const permisosUsuario = (await obtenerListadoPermisosDesde(rolEncontrado.permisos))
            .map(value => value.nombre_permiso);

        const cuentaConPermisosRequeridos = permisos_requeridos.every(permiso_requerido => permisosUsuario.includes(permiso_requerido));

        if (!cuentaConPermisosRequeridos) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos permisos ${permisos_requeridos}`
            });
        }

        async function obtenerListadoPermisosDesde(identificadores) {
            const permisos = [];
            for (let identificador = 0; identificador < identificadores.length; identificador++) {
                const permiso = await Permiso.findOne({_id: identificadores[identificador].toString()});
                permisos.push(permiso);
            }

            return permisos;

        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}
