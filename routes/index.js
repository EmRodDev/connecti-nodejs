const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');
const adminController = require('../controllers/adminController.js');
const groupsController = require('../controllers/groupsController.js');
const connectisController = require('../controllers/connectisController.js');


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
        authController.authenticatedUser,
        groupsController.uploadImage,
        groupsController.createGroup
    );

    //Edit groups
    router.get('/edit-group/:groupId',
        authController.authenticatedUser,
        groupsController.editGroupForm
    );

    router.post('/edit-group/:groupId',
    authController.authenticatedUser,
    groupsController.editGroup
    );

    //Edit group images
    router.get('/img-group/:groupId',
    authController.authenticatedUser,
    groupsController.editImgForm
    );

    router.post('/img-group/:groupId',
    authController.authenticatedUser,
    groupsController.uploadImage,
    groupsController.editImg
    );

    //Delete groups
    router.get('/delete-group/:groupId',
    authController.authenticatedUser,
    groupsController.deleteGroupForm
    );

    router.post('/delete-group/:groupId',
    authController.authenticatedUser,
    groupsController.deleteGroup
    );

    //New Connecti
    router.get('/new-connecti',
    authController.authenticatedUser,
    connectisController.newConnectiForm
    );
    router.post('/new-connecti',
    authController.authenticatedUser,
    connectisController.sanitizeConnecti,
    connectisController.newConnecti
    );

    //Edit Connecti
    router.get('/edit-connecti/:id',
    authController.authenticatedUser,
    connectisController.editConnectiForm
    );
    router.post('/edit-connecti/:id',
    authController.authenticatedUser,
    connectisController.editConnecti
    );

    //Delete Connecti
    router.get('/delete-connecti/:id',
    authController.authenticatedUser,
    connectisController.deleteConnectiForm
    );
    router.post('/delete-connecti/:id',
    authController.authenticatedUser,
    connectisController.deleteConnecti
    );

    return router
}