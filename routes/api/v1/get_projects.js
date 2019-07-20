const Project = require('../../../models/project');
const Technology = require('../../../models/technology');
const Employer = require('../../../models/employer');

exports.post = async function (req, res) {
    try {
        let data = [];
        let projects = await Project.find({});

     //   projects.forEach(project => {
            for (let project = 0; project < projects.length; project++ )
            {
                let oneProject = [];
                let images = [];
                for (let i = 0; i < projects[project].images.length; i++) {
                    images.push(`${req.headers['host']}/${projects[project].images[i]}`);
                }

                projects[project].images = images;

                let employer = await Employer.findOne({_id:  projects[project].employerId});
                console.log(employer);
                data.push( projects[project]);
            }

      //  });

        res.status(200).send(data);
    } catch (err) {
        throw err;
    }


    // let data = [
    //     {
    //         company: "Название компании",
    //         company_avatar: "Ссылка на аватарку компании",
    //         project_name: "Название проекта",
    //         project_description: "Описание проекта",
    //         project_foto: "Ссылка на фото проекта",
    //         list_competentions: ["CSS", "HTML"],
    //         count_orders: 12,
    //         approved_by_university: ["САПР", "ЭВМ"],
    //     }
    // ];
};
