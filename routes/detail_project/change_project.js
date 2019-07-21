const Project = require('../../models/project');

exports.post = async function (req, res) {
    try {
        let updateProject={
            description:req.body.description
        };


        console.log('Body'+req.body.description);

        await Project.findOneAndUpdate({_id: req.body.project_id}, updateProject );

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};