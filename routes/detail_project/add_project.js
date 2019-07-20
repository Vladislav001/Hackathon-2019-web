const Project = require('../../models/project');
const Technology = require('../../models/technology');

exports.post = async function (req, res) {
    try {
        console.log(req.body);
        console.log(req.files);

        let massImgnames=[];
        for(let i=0;i<req.files.length;++i){
            massImgnames.push('/uploads/'+req.files[i].originalname);
        }

        let payment=false;
if(req.body.payment=='on'){
    payment=true;
}

        let newProj=new Project({
            name:req.body.name,
            description:req.body.description,
            employerId:req.user._id,
            images:massImgnames,
            payment:payment

        });


        newProj.save();
        // let massTechnologes=[];
        if(req.body.technologes){
            for(let i=0;i<req.body.technologes.length;++i){
                // massTechnologes.push(req.body.technologes[i]);
                let tech=new Technology({name:req.body.technologes[i],projectId:newProj._id});
                tech.save();
            }
        }



        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};
