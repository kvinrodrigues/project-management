const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    // nombre del rol
    rol: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    },
    descripcion: {
        type: String,
        required: true
    },
    permisos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Permiso",
        }
    ],
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Role', RoleSchema);
