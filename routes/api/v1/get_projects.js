const Project = require('../../../models/project');
const Technology = require('../../../models/technology');
const Employer = require('../../../models/employer');
const projStudentSchema = require('../../../models/project_student');
const apiError = require('../../../functions/apierror');
const constants = require('../../../functions/constants');
const jwt = require('jsonwebtoken');

exports.post = async function (req, res) {
    try {
        let token = req.headers['x-access-token'];
        let projectsIDOfStudent = [];
        let data = [];
        let projects = await Project.find({complited: false, closed:false});

        if (token) {
            let errors = [];
            try {
                let tokenExistAndRight = jwt.verify(token, constants.SECRET_STRING);
                let projectsOrdered = await projStudentSchema.find({studentId: tokenExistAndRight.id});

                for (let projectOrdered = 0; projectOrdered < projectsOrdered.length; projectOrdered++)
                {
                    projectsIDOfStudent.push(String(projectsOrdered[projectOrdered].projectId));
                }


            } catch (errToken) {
                errors.push(apiError.createError("1", 'Введен неверный токен, или срок действия токена истек'));
                return res.status(403).json({
                    errors
                });
            }
        }


            for (let project = 0; project < projects.length; project++ )
            {
                let oneProject = {};
                let images = [];
                for (let i = 0; i < projects[project].images.length; i++) {
                    images.push(`${constants.PROTOCOL}${req.headers['host']}${projects[project].images[i]}`);
                }

                oneProject.id = projects[project]._id;
                oneProject.project_name = projects[project].name;
                oneProject.project_description = projects[project].description;
                oneProject.project_foto = images[0];

                let employer = await Employer.findOne({_id:  projects[project].employerId});
                oneProject.company = employer.company;
                oneProject.company_avatar = `${constants.PROTOCOL}${req.headers['host']}${employer.image_avatar}`;

                let technologies =  await Technology.find({projectId:  projects[project]._id});
                let competitions = [];
                for (let technology = 0; technology < technologies.length; technology++ )
                {
                    competitions.push(technologies[technology].name);
                }
                oneProject.list_competitions = competitions;

                let countMemberships = await projStudentSchema.countDocuments({projectId: projects[project]._id});
                oneProject.count_orders = countMemberships;
                oneProject.approved_by_university = ["adad", "adadeq"];

                if(projectsIDOfStudent.indexOf(String(projects[project]._id)) != -1)
                {
                    let record = await projStudentSchema.findOne({projectId: projects[project]._id});

                    oneProject.isOrdered = record.status;
                }
                data.push(oneProject);
            }


        res.status(200).send(data);
    } catch (err) {
        throw err;
    }


    // let data = [
    //     {
    //         company: "Название компании",
    //         company_avatar: "Ссылка на аватарку компании",
    //         project_name: "Название проекта",
    //         project_description: "Описание проекта",
    //         project_foto: "Ссылка на фото проекта",
    //         list_competentions: ["CSS", "HTML"],
    //         count_orders: 12,
    //         approved_by_university: ["САПР", "ЭВМ"],
    //     }
    // ];
};
