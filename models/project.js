const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    images: {
        type: [String],
    },
    complited:{
        type:Boolean
    }
});

module.exports = mongoose.model('User', projectSchema );