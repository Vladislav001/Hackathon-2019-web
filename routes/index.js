const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const isAuthenticated = require('../middleware/is_authenticated');

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

    router.get('/', require('./auth/login').get);
    router.get('/registration', require('./auth/registration').get);


    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/company-detail',
        failureRedirect: '/',
        failureFlash: true
    }));
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/company-detail',
        failureRedirect: '/',
        failureFlash: true
    }));
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    router.get('/detail-project', require('./detail_project/card').get);

// Тестовые запросы
// router.get('/', require('./example/main_example').get);
// router.post('/add-example', require('./example/add_example').post);
// router.post('/delete-example/id:_id', require('./example/delete_example').post);
// router.post('/update-example/id:_id', require('./example/update_example').post);
// router.get('/example/id:_id', require('./example/detail_example').get);


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
    router.post('/api/v1/example', require('./api/v1/example').post);

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
     *     - name: "id"
     *       in: "form-data"
     *       description: "ID записи"
     *       required: true
     *       type: "string"
     *     - name: "file"
     *       in: "form-data"
     *       description: "Файл для загрузки"
     *       required: true
     *       type: "file"
     *     responses:
     *       200:
     *        description: Example data
     *        examples:
     *           application/json: { }
     */
    router.post('/api/v1/example-upload-file', upload.single('file'), require('./api/v1/example_upload_file').post);

// websockets
    require('./api/v1/example_websocket');



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

    return router;
};