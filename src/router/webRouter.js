// Import custom module
const parseModule = require('../middleware/parseModule');
const validationMoudle = require('../middleware/validationModule');
const webController = require('../controllers/webController');
// Import module
const express = require('express');
let router = express.Router();

const webRouter = (app) => {
    router.get('/', webController.callAllUser);

    router.get('/:id(\\d+)', webController.callDetailUser);

    router.post('/', parseModule, validationMoudle, webController.callCreateUser);

    router.put('/:id(\\d+)', parseModule, validationMoudle, webController.callFixUser);

    router.delete('/:id(\\d+)', webController.callDelUser);

    // Render ra trang add khi nhận được endpoint là add
    router.get('/add', (req, res) => {
        res.render('add', { messages: req.flash('error') });
    })

    // Make Prefix for Router
    return app.use('/public-api/users/', router);
}

module.exports = webRouter