//const Project = require('../../models/project');
//const Technology = require('../../models/technology');
const ProjectStudent = require('../../models/project_student');

exports.post = async function (req, res) {
    try {
        // console.log(req.body);
        // console.log(req.files);
        let oldObj =await ProjectStudent.findOne({projectId:req.body.projectId,studentId:req.body.studentId});
        oldObj.status=1;
        oldObj.save();

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};
