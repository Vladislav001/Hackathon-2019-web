const Technology = require('../../models/technology');

exports.post = async function (req, res) {
    try {
        await Technology.findOneAndDelete({_id:req.body.technologyId});

        res.status(200).send('');
    } catch (err) {
        throw err;
    }
};