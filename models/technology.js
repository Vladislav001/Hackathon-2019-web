const mongoose = require('mongoose');

const technologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
});

module.exports = mongoose.model('Technology', technologySchema );