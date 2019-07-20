const Project = require('../../../models/project');
const Technology = require('../../../models/technology');
const Employer = require('../../../models/employer');

exports.post = async function (req, res) {
    try {
        let data = [];
        let projects = await Project.find({});

            for (let project = 0; project < projects.length; project++ )
            {
                let oneProject = {};
                let images = [];
                for (let i = 0; i < projects[project].images.length; i++) {
                    images.push(`${req.headers['host']}${projects[project].images[i]}`);
                }

                oneProject.project_name = projects[project].name;
                oneProject.project_description = projects[project].description;
                oneProject.project_foto = images[0];

                let employer = await Employer.findOne({_id:  projects[project].employerId});
                oneProject.company = employer.company;
                oneProject.company_avatar = employer.image_avatar;

                let technologies =  await Technology.find({projectId:  projects[project]._id});
                let competitions = [];
                for (let technology = 0; technology < technologies.length; technology++ )
                {
                    competitions.push(technologies[technology].name);
                }
                oneProject.list_competitions = competitions;
                oneProject.count_orders = 'ТУТА БУДЕТ СУЩНОСТЬ';
                oneProject.approved_by_university = 'ТУТА БУДЕТ ЧТО ТО ЕЩЕ';
                data.push( oneProject);
            }


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
