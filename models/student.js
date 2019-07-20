const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    first_name: {
        type: String,
    },
    second_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    id_university: {
        type: Number,
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model('Student', studentSchema);