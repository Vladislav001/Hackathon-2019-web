const mongoose = require('mongoose');

const projStudentSchema = mongoose.Schema({

//0-заявка подана(висит без ответа)
    //1-заявка принята(студент апрувнут)
    //2-заявка отлонена
    //3-
    status: {
        type: Number,
default:0
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
});

module.exports = mongoose.model('ProjectStudent', projStudentSchema  );