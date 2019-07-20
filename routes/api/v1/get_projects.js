const Project = require('../../../models/project');
const Technology = require('../../../models/technology');

exports.post = async function (req, res) {
    try {
        let projects = await Project.find({});
        console.log(projects)
        let data = [
            {
                company: "Название компании",
                company_avatar: "Ссылка на аватарку компании",
                project_name: "Название проекта",
                project_description: "Описание проекта",
                project_foto: "Ссылка на фото проекта",
                list_competentions: ["CSS", "HTML"],
                count_orders: 12,
                approved_by_university: ["САПР", "ЭВМ"],
            }
        ];


        // projects.forEach(example => {
        //     example.file = `${req.headers['host']}/${example.file}`;
        //     data.push(example);
        // });

        res.status(200).send(data);
    } catch (err) {
        throw err;
    }
};
