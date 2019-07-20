// const Empl = require('../../models/employer');
// const Project = require('../../models/project');
 const Empl = require('../../models/employer');

exports.post = async function (req, res) {
    try {
        let updateEmpl={
            company:req.body.name,
            site:req.body.site,
            email:req.body.email,
            //image_avatar
            phone_number:req.body.phoneNumber

        };
        //req.user._id
        if(req.files.length>0){
            updateEmpl.image_avatar='/uploads/'+req.files[0].originalname;
        }

        // let massImgnames=[];
        // for(let i=0;i<req.files.length;++i){
        //     massImgnames.push('/uploads/'+req.files[i].originalname);
        // }


        let newEmpl=await Empl.findByIdAndUpdate(req.user._id, updateEmpl );

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};



