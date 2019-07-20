const Project = require('../../../../models/project');
const projStudentSchema = require('../../../../models/project_student');


exports.post = async function (req, res) {
    try {
        let projectID = req.body.id;

        let alreadyExist = await projStudentSchema.find({projectId: projectID, studentId: res.studentId});

        if(alreadyExist.length == 0)
        {
            let newProjStudentSchema = new projStudentSchema();
            newProjStudentSchema.projectId = projectID;
            newProjStudentSchema.studentId = res.studentId;

            newProjStudentSchema.save();

            res.status(200).send({
                message: "Заявка подана"
            });
        } else {
            res.status(401).send({
                message: "Вы уже подали заявку"
            });
        }

    } catch (err) {
        throw err;
    }

};
