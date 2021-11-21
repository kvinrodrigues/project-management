const { Schema, model } = require('mongoose');

const BacklogSchema = Schema({
    userstories: [{
        type: Schema.Types.ObjectId,
        ref: 'UserStories',
        required: true
    }],
    nombre: {
        type: String
    }
});

BacklogSchema.methods.toJson = function() {
    const { __v, _id, ...backlog } = this.toObject();
    backlog.uid = _id;
    return backlog;
}


module.exports = model('Backlog', BacklogSchema);