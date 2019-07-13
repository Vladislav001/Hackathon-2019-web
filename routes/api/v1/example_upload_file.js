const Example = require('../../../models/example');

exports.post = async function (req, res) {
    try {
        //console.log(req.body);
        //console.log(req.file);
        //console.log(req.file.originalname);
        //
        await Example.findOneAndUpdate(

            {"_id": req.body.id},
            {file: `uploads/${req.file.originalname}`}
        );

        res.status(200).send();
    } catch (err) {
        throw err;
    }
};
