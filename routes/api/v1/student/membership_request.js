const Project = require('../../../../models/project');
const projStudentSchema = require('../../../../models/project_student');


exports.post = async function (req, res) {
    try {
        let projectID = req.body.id;
        let newProjStudentSchema = new projStudentSchema();
       // newProjStudentSchema.projectId = projectID;
        //newProjStudentSchema.studentId = projectID;

        console.log(res.studentId);


        res.status(200).send('');
    } catch (err) {
        throw err;
    }

};
