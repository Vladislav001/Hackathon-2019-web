const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Student', studentSchema);