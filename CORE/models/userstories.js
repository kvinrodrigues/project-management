const { Schema, model } = require('mongoose');

const storySchema = Schema({
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true
    },
    titulo: {
        type: String
    },
    solicitante: {
        type: String
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

storySchema.methods.toJson = function() {
    const { __v, _id, ...userstories } = this.toObject();
    userstories.uid = _id;
    return userstories;
}


module.exports = model('UserStories', storySchema);