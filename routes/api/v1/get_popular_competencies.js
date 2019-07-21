const Technology = require('../../../models/technology');

exports.post = async function (req, res) {
    let competencies = await Technology.find({}).select('name -_id');

    let cleanCompetencies = [];

    for (let i = 0; i < competencies.length; i++)
    {
        cleanCompetencies.push(competencies[i].name);
    }

    //console.log(competencies);

    let countCompetencies = cleanCompetencies.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }

        return acc;
    }, {});

    //console.log(countCompetencies);

    let sortable = [];
    for (let vehicle in countCompetencies) {
       sortable.push([vehicle, countCompetencies[vehicle]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    console.log(sortable);


    res.status(200).send(sortable);
};
