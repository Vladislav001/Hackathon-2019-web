const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const isAuthenticated = require('../middleware/is_authenticated');
const verifyToken = require('../middleware/verify_token');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const fileFilter = function (req, file, callback) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 мб
    },
    //fileFilter: fileFilter
});

module.exports = function (passport) {

    // для вывода верхнего и бокового меню
    router.use(function (req, res, next) {
        res.locals.authorized = req.isAuthenticated();
        next();
    });

    router.get('/', require('./auth/login').get);
    router.get('/registration', require('./auth/registration').get);


    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/detail-company',
        failureRedirect: '/',
        failureFlash: true
    }));
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/detail-company',
        failureRedirect: '/',
        failureFlash: true
    }));
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    router.get('/detail-project/id:_id', isAuthenticated, require('./detail_project/detail_project').get);
    router.get('/detail-company', isAuthenticated, require('./company/detail_company').get);
    router.post('/create-project', isAuthenticated, upload.any('files'), require('./detail_project/add_project').post);
    router.post('/change-company', isAuthenticated,upload.single('file'), require('./company/change_company').post);
    router.post('/change-project', isAuthenticated, require('./detail_project/change_project').post);
    router.post('/accept-student', isAuthenticated, require('./detail_project/accept_student').post);
    router.post('/decline-student', isAuthenticated, require('./detail_project/decline_student').post);
    router.get('/detail-student/id:_id', isAuthenticated, require('./detail_student').get);
    router.post('/delete-image-project', isAuthenticated, require('./detail_project/delete_image').post);
    router.post('/complite-project', isAuthenticated, require('./detail_project/complite_project').post);
    router.post('/close-project', isAuthenticated, require('./detail_project/close_project').post);
    router.post('/add-technology', isAuthenticated, require('./detail_project/add_technology').post);
    router.post('/delete-technology', isAuthenticated, require('./detail_project/delete_technology').post);


////**** API ****\\\\

// swagger definition
    const swaggerDefinition = require('../swagger.json');

// options for the swagger docs
    const options = {
// import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
// path to the API docs
        apis: ['./routes/*.js'],
    };

// initialize swagger-jsdoc
    const swaggerSpec = swaggerJSDoc(options);

// serve swagger
    router.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    /**
     * @swagger
     * /api/v1/example:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Example API"
     *     description: ""
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *        description: Example data
     *        examples:
     *           application/json: { "_id": "5d1bab42042e52e0444e81af", "name": "some" }
     */
    router.post('/api/v1/example', verifyToken, require('./api/v1/example').post);

    /**
     * @swagger
     * /api/v1/example-upload-file:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Example upload file"
     *     description: ""
     *     produces:
     *       - form-data
     *     parameters:
     *     - name: "x-access-token"
     *       in: "header"
     *       description: "Токен"
     *       required: true
     *       type: "string"
     *     - name: "id"
     *       in: "form-data"
     *       description: "ID проекта"
     *       required: true
     *       type: "file"
     *     responses:
     *       200:
     *        description: Example data
     *        examples:
     *           application/json: { }
     */
    router.post('/api/v1/example-upload-file', upload.single('file'), require('./api/v1/example_upload_file').post);


    /**
     * @swagger
     * /api/v1/get-universities:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Получить список университетов города"
     *     description: ""
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *        description: Example data
     *        examples:
     *           application/json: [{ id: 1, name: "ВолгГТУ"}, { id: 2, name: "ВолгГМУ"}]
     */
    router.post('/api/v1/get-universities', require('./api/v1/get_universities').post);

    /**
     * @swagger
     * /api/v1/student/registration:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Регистрация студента"
     *     description: ""
     *     produces:
     *       - application/json
     *     parameters:
     *     - name: "email"
     *       in: "x-www-form-urlencoded"
     *       description: "Почта"
     *       required: true
     *       type: "string"
     *     - name: "password"
     *       in: "x-www-form-urlencoded"
     *       description: "Пароль"
     *       required: true
     *       type: "string"
     *     - name: "first_name"
     *       in: "x-www-form-urlencoded"
     *       description: "Имя"
     *       required: true
     *       type: "string"
     *     - name: "second_name"
     *       in: "x-www-form-urlencoded"
     *       description: "Фамилия"
     *       required: true
     *       type: "string"
     *     - name: "last_name"
     *       in: "x-www-form-urlencoded"
     *       description: "Отчество"
     *       required: true
     *       type: "string"
     *     - name: "id_university"
     *       in: "x-www-form-urlencoded"
     *       description: "ID университета"
     *       required: true
     *       type: "integer"
     *     responses:
     *       200:
     *        description: Пользователь успешно зарегистрирован
     *        examples:
     *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
     *       401:
     *         description: Введены неверные данные
     *         examples:
     *           application/json:
     *            {
     *              errors:
     *              [
     *                {
     *                 id: 1, message: Пользователь с такой почтой уже зарегистрирован
     *                }
     *              ]
     *            }
     *
     */
    router.post('/api/v1/student/registration', require('./api/v1/student/registration').post);

    /**
     * @swagger
     * /api/v1/student/login:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Авторизация студента"
     *     description: ""
     *     produces:
     *       - application/json
     *     parameters:
     *     - name: "email"
     *       in: "x-www-form-urlencoded"
     *       description: "Почта"
     *       required: true
     *       type: "string"
     *     - name: "password"
     *       in: "x-www-form-urlencoded"
     *       description: "Пароль"
     *       required: true
     *       type: "string"
     *     responses:
     *       200:
     *        description: Пользователь успешно авторизован
     *        examples:
     *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
     *       401:
     *         description: Введены неверные данные
     *         examples:
     *           application/json:
     *            {
     *              errors:
     *              [
     *                {
     *                 id: 2, message: Вы ввели неверную почту или пароль
     *                }
     *              ]
     *            }
     *
     */
    router.post('/api/v1/student/login', require('./api/v1/student/login').post);

    /**
     * @swagger
     * /api/v1/get-projects:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Получение проектов"
     *     description: ""
     *     produces:
     *       - application/json
     *     parameters:
     *     - name: "x-access-token"
     *       in: "header"
     *       description: "Токен"
     *       required: false
     *       type: "string"
     *     responses:
     *       200:
     *        description: Проекты успешно получены
     *        examples:
     *           application/json: { id:13dad, company: Название компании, company_avatar: Ссылка на аватарку компании,
     *            project_name: Название проекта, project_description: Описание проекта, project_foto: Ссылка на фото проекта,
     *            payment: true, list_competitions: ["CSS", "HTML"], count_orders: 12, approved_by_university: ["САПР", "ЭВМ"], isOrdered: 0}
     *
     */
    router.post('/api/v1/get-projects', require('./api/v1/get_projects').post);

    /**
     * @swagger
     * /api/v1/detail-project:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Получение детальной информации о проекте"
     *     description: ""
     *     produces:
     *       - application/json
     *     parameters:
     *     - name: "id"
     *       in: "form-data"
     *       description: "ID проекта"
     *       required: true
     *       type: "string"
     *     responses:
     *       200:
     *        description: Проекты успешно получены
     *        examples:
     *           application/json: { company: Название компании, company_avatar: Ссылка на аватарку компании,
     *            project_name: Название проекта, project_description: Описание проекта, project_foto: Ссылка на фото проекта,
     *            project_fotos: ["Ссылка 1", "Ссылка 2"], list_competentions: ["CSS", "HTML"], count_orders: 12, approved_by_university: ["САПР", "ЭВМ"]}
     *
     */
    router.post('/api/v1/detail-project', require('./api/v1/detail_project').post);

    /**
     * @swagger
     * /api/v1/student/membership-request:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Подача заявки на участие в проекте"
     *     description: ""
     *     produces:
     *       - application/json
     *     parameters:
     *     - name: "x-access-token"
     *       in: "header"
     *       description: "Токен"
     *       required: true
     *       type: "string"
     *     - name: "id"
     *       in: "form-data"
     *       description: "ID проекта"
     *       required: true
     *       type: "string"
     *     responses:
     *       200:
     *        description: Заявка подана
     *        examples:
     *           application/json: { message: Заявка подана}
     *       401:
     *        description: Вы уже подали заявку
     *        examples:
     *           application/json: { message: Вы уже подали заявку}
     *
     */
    router.post('/api/v1/student/membership-request', verifyToken, require('./api/v1/student/membership_request').post);


    /**
     * @swagger
     * /api/v1/get-popular-competencies:
     *   post:
     *     tags:
     *       - ""
     *     summary: "Получить навыки по популярности"
     *     description: ""
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *        description: Example data
     *        examples:
     *           application/json: [{ name: ml, count: 2}, { name: php, count: 1}]
     */
    router.post('/api/v1/get-popular-competencies', require('./api/v1/get_popular_competencies').post);

    return router;
};