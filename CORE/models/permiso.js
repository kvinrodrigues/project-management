const { Schema, model } = require('mongoose');


const PermisoSchema = Schema({
    nombre_permiso: {
        type: String,
        required: [true, 'El nombre del permiso es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion del permiso es obligatorio']
    }
});

PermisoSchema.methods.toJSON = function() {
    const { __v, _id, ...permiso } = this.toObject();
    permiso.uid = _id;
    return permiso;
}

module.exports = model('Permiso', PermisoSchema);
