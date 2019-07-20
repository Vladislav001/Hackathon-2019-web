const Project = require('../../models/project');
const Technology = require('../../models/technology');

exports.post = async function (req, res) {
    try {
        console.log(req.body);
        console.log(req.files);

        let massImgnames=[];
        for(let i=0;i<req.files.length;++i){
            massImgnames.push(req.files[i].originalname);
        }


        let newProj=new Project({
            name:req.body.name,
            description:req.body.description,
            employerId:req.user._id,
            images:massImgnames,
            payment:req.body.payment

        });


        newProj.save();
        // let massTechnologes=[];
        for(let i=0;i<req.body.technologes.length;++i){
            // massTechnologes.push(req.body.technologes[i]);
            let tech=new Technology({name:req.body.technologes[i],projectId:newProj._id});

        }


        res.status(200).send(data);
    } catch (err) {
        throw err;
    }
};
