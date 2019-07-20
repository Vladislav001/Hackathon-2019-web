const Project = require('../../../models/project');

exports.post = async function (req, res) {
    try {
        let newProj=new Project({
            name:req.body.name,
            description:req.body.description,
            employerId:req.user._id,
            //images:,

        });
//req.technologes
        newProj.save();

        res.status(200).send(data);
    } catch (err) {
        throw err;
    }
};
