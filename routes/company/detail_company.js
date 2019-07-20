const Empl = require('../../models/employer');
const Project = require('../../models/project');

exports.get = async function (req, res) {
    try {
        //let company= await Empl.findOne({ _id: req.user._id });
        let projects= await Project.find({employerId:res.user._id});;


        res.render('company/detail_company', {
            // Model: {
            //     user:req.user,
            //     projects:projects,
            //
            // }
            Model:{
                user:{
                    company:'company1',
                    site:'site1',
                    email:'email1',
                    password:'password1',
                    image_avatar:'image_avatar1',

                },
                projects:[
                    {name:'name1',
                        description:'description1',
                        _id:'123'
                    }

                ]

            }

        });
    } catch (err) {
        throw err;
    }
};;



