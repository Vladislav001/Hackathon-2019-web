//const Students = require('../../models/student');
const Project = require('../../models/project');
//const Technology = require('../../models/technology');
//const Employer = require('../../models/employer');
//const Project_student = require('../../models/project_student');

exports.post = async function (req, res) {
    try {

        let project = await Project.findOne({_id: req.body.projectId});
        project.endDescription=req.body.endDescription;
        project.complited=true;
        project.save();

        res.status(200).send('');

    } catch (err) {
        throw err;
    }

};
//