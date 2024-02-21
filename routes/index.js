const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');
const adminController = require('../controllers/adminController.js');
const groupsController = require('../controllers/groupsController.js');


module.exports = function (){
    router.get('/', homeController.home);

    /** Create and confirm accounts **/
    router.get('/sign-up', usersController.createAccountForm);
    router.post('/sign-up', usersController.createNewAccount);
    router.get('/confirm-account/:email', usersController.confirmAccount);

    //Sign in
    router.get('/sign-in', usersController.signInForm);
    router.post('/sign-in', authController.authenticateUser);

    /** Administration panel **/
    router.get('/admin', authController.authenticatedUser, adminController.adminPanel);

    /** New groups **/
    router.get('/new-group',
        authController.authenticatedUser,
        groupsController.newGroupForm
    );

    router.post('/new-group',
        groupsController.createGroup
    );

    return router
}