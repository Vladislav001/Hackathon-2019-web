const Technology = require('../../../models/technology');

exports.post = async function (req, res) {
    let competencies = await Technology.find({}).select('name -_id');

    let cleanCompetencies = [];

    for (let i = 0; i < competencies.length; i++)
    {
        cleanCompetencies.push(competencies[i].name);
    }

    console.log(competencies);

    let countCompetencies = cleanCompetencies.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }

        return acc;
    }, {});

    console.log(countCompetencies);

    let mass=[];
    for (key in countCompetencies) {
        mass.push({name:key,count:countCompetencies[key]});

    }

    mass.sort(function(aObj,bObj){
        return bObj.count - aObj.count;
    });



    res.status(200).send(mass);
};
