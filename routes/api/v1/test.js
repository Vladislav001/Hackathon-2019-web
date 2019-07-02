exports.get = function (req, res) {
    try {

        res.status(200).send({
            "pictograms": pictograms
        });
    } catch (err) {
        throw err;
    }
};
