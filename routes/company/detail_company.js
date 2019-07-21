const Empl = require('../../models/employer');
const Project = require('../../models/project');

exports.get = async function (req, res) {
    try {
        //let company= await Empl.findOne({ _id: req.user._id });
        //let projects= await Project.find({employerId:res.user._id});;
        let projects=await Project.find({employerId:req.user._id});

        res.render('company/detail_company', {

            Model:{
                user:req.user,
                projects:projects
            }

        });
    } catch (err) {
        throw err;
    }
};



