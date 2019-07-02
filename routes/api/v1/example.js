const Example = require('../../../models/example');

exports.post = async function (req, res) {
    try {
        let examples = await Example.find({});

        res.status(200).send(examples);
    } catch (err) {
        throw err;
    }
};
