const Students = require('../../models/student');
const Project = require('../../models/project');
const Technology = require('../../models/technology');

exports.get = async function (req, res) {
    try {
        let students = await Students.find({});
        let project = await Project.findOne({_id: '5d33667af2e60a2d88be9c9e'});
        let technology = await Technology.find({});
        console.log(project);
        // console.log(students);
        // projects.forEach(example => {
        //     example.file = `${req.headers['host']}/${example.file}`;
        //     data.push(example);
        // });

        res.render('detail_project/detail_project', {
                students:students,
        });

    } catch (err) {
        throw err;
    }

};