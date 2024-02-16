const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const usersController = require('../controllers/usersController.js');

module.exports = function (){
    router.get('/', homeController.home);

    router.get('/create-account', usersController.createAccountForm);

    return router
}