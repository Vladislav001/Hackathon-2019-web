const Example = require('../../models/example');

exports.post = function (req, res) {
    try {
console.log(req.body);
        let newExample = new Example();
        newExample.name = req.body.name;

        newExample.save();
        res.status(200).send('');
    } catch (err) {
        res.status(403).send('');
        throw err;
    }
};