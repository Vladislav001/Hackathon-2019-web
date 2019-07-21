const Technology = require('../../models/technology');

exports.post = async function (req, res) {
    try {
        if(req.body.name){
            let tech=new Technology({name:req.body.name.toLowerCase().trim(),projectId:req.body.projectId});
            tech.save();
        }

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};