const { Schema, model } = require('mongoose');

const SprintSchema = Schema({
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    userstories: [{
        type: Schema.Types.ObjectId,
        ref: 'UserStories',
        required: true
    }],
    fecha_inicio: {
        type: Date,
        required: false,
        default: Date.now()
    },
    estado: {
        type: Boolean,
        default: true
    }

});

SprintSchema.methods.toJson = function() {
    const { __v, _id, ...sprint } = this.toObject();
    sprint.uid = _id;
    return sprint;
}

module.exports = model('Sprint', SprintSchema);