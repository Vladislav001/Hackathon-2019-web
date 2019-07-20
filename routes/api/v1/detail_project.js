const Project = require('../../../models/project');

exports.post = async function (req, res) {
    try {

        console.log(req.body.id);
        let project = await Project.findOne({_id: req.body.id});

        let data = [
            {
                company: "Название компании",
                company_avatar: "Ссылка на аватарку компании",
                project_name: "Название проекта",
                project_description: "Описание проекта",
                project_foto: "Ссылка на фото проекта",
                project_fotos: ["Ссылка 1", "Ссылка 2"],
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
