const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

module.exports = mongoose.model('User', userSchema);