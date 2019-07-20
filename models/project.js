const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('User', projectSchema );