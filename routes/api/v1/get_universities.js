exports.post = function (req, res) {
    let universities = [
        {
            id: 1,
            name: "ВолгГТУ"
        },
        {
            id: 2,
            name: "ВолгГМУ"
        },
        {
            id: 3,
            name: "ВолГУ"
        },
        {
            id: 4,
            name: "ВГСПУ"
        }
    ];

    res.status(200).send(universities);
};
