const Project = require('../../models/project');
//const Technology = require('../../models/technology');
//const ProjectStudent = require('../../models/project_student');

exports.post = async function (req, res) {
    try {
        // console.log(req.body);
        // console.log(req.files);


        //let proj =await Project.findOne({_id:req.body.projectId,studentId:req.body.studentId});
        let proj =await Project.findOne({_id: req.body.project_id} );
let indexDel=proj.images.indexOf(req.body.delImagePath);

        if (indexDel> -1) {
            proj.images.splice(indexDel, 1);
        }
        proj.save();

        // let oldObj =await ProjectStudent.findOne({projectId:req.body.projectId,studentId:req.body.studentId});
        // oldObj.status=1;
        // oldObj.save();

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};

// router.post('/delete-image-project', isAuthenticated, require('./detail_project/delete_image').post);