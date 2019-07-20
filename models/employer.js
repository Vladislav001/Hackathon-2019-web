const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    site: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Employer', employerSchema);