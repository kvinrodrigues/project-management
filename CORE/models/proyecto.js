const { Schema, model } = require('mongoose');


const ProyectoSchema = Schema({
    nombre_proyecto: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    }]
});


ProyectoSchema.methods.toJSON = function() {
    const { __v, _id, ...proyecto } = this.toObject();
    proyecto.uid = _id;
    return proyecto;
}

module.exports = model('Proyecto', ProyectoSchema);