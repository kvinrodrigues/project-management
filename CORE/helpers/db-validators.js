const Permiso = require('../models/permiso');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Storie = require('../models/userstories');
const Sprint = require('../models/sprint');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existePermisoPorId = async(id) => {
    //Verificar si existe el permiso
    const existePermiso = await Permiso.findById(id);
    if (!existePermiso) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeRolPorId = async(id) => {
    //Verificar si existe el rol
    const existeRol = await Role.findById(id);
    if (!existeRol) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeStoriePorId = async(id) => {
    //Verifica si existe el storie 
    const existeStorie = await Storie.findById(id);
    if (!existeStorie) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeSprintPorId = async(id) => {
    const existeSprint = await Sprint.findById(id);
    if (!existeSprint) {
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existePermisoPorId,
    existeRolPorId,
    existeStoriePorId,
    existeSprintPorId
}