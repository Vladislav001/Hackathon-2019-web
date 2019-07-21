const Project = require('../../models/project');

exports.post = async function (req, res) {
    try {
        let proj=await Project.findOne({_id: req.body.projectId});
        console.log(proj);
        console.log(req.body);
        proj.name=req.body.name;
        proj.description=req.body.description;
        //
        // let updateProject={
        //     description:req.body.description,
        //     name:req.body.name
        // };



        if(req.files){
            for(let i=0;i<req.files.length;++i){
                proj.images.push('/uploads/'+req.files[i].originalname);
                //updateEmpl.image_avatar='/uploads/'+req.files[0].originalname;
            }
        }
        proj.save();
        //console.log('Body'+req.body.description);

        //await Project.findOneAndUpdate({_id: req.body.project_id}, updateProject );

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};