const Students = require('../models/student');


exports.get = async function (req, res) {
    try {
        let student = await Students.findOne({_id: req.params._id});

        res.render('student/detail', {
            student: student
        });

    } catch (err) {
        throw err;
    }

};