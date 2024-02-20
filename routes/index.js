const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');
const adminController = require('../controllers/adminController.js');


module.exports = function (){
    router.get('/', homeController.home);

    /** Create and confirm accounts **/
    router.get('/sign-up', usersController.createAccountForm);
    router.post('/sign-up', usersController.createNewAccount);
    router.get('/confirm-account/:email', usersController.confirmAccount);

    //Sign in
    router.get('/sign-in', usersController.signInForm);
    router.post('/sign-in', authController.authenticateUser);

    //Administration panel
    router.get('/admin', adminController.adminPanel);

    return router
}