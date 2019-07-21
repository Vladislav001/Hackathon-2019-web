const Students = require('../../models/student');
const Project = require('../../models/project');
const Technology = require('../../models/technology');
const Employer = require('../../models/employer');
const Project_student = require('../../models/project_student');

exports.get = async function (req, res) {
    try {
        // '5d33667af2e60a2d88be9c9e'

        let project = await Project.findOne({_id: req.params._id});
        let employer = await Employer.findOne({_id:project.employerId});
        let technology = await Technology.find({projectId:project._id});
        let project_student = await Project_student.find({projectId:project._id});

        let students=[];
        for(let i=0;i<project_student.length;++i){
            students.push(await Students.findOne({_id:project_student[i].studentId}));
        }

        // console.log(students[0][0].first_name);
        // projects.forEach(example => {
        //     example.file = `${req.headers['host']}/${example.file}`;
        //     data.push(example);
        // });

        res.render('detail_project/detail_project', {
            project_student:project_student,
            students:students,
            technology:technology,
            project:project,
            employer:employer,
        });

    } catch (err) {
        throw err;
    }

};