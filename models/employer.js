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
    image_avatar: {
        type: String,
        default: '/uploads/test_file.jpg'
    },
    phone_number: {
        type: String
    },
});

module.exports = mongoose.model('Employer', employerSchema);