exports.post = function (req, res) {
    let universities = [
        "ВолгГТУ",
        "ВолгГМУ"
    ];
    res.status(200).send(universities);
};
