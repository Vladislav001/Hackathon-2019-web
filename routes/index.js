const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');

router.get('/', require ('./example/main_example').get);

router.post('/add-example', require ('./example/add_example').post);
router.post('/delete-example/id:_id', require ('./example/delete_example').post);
router.post('/update-example/id:_id', require ('./example/update_example').post);
router.get('/example/id:_id', require ('./example/detail_example').get);




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
    * /api/v1/test:
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
 

module.exports = router;
