const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');
const adminController = require('../controllers/adminController.js');
const groupsController = require('../controllers/groupsController.js');
const connectisController = require('../controllers/connectisController.js');

const connectisControllerFE = require('../controllers/frontend/connectisControllerFE.js');
const usersControllerFE = require('../controllers/frontend/usersControllerFE.js');
const groupsControllerFE = require('../controllers/frontend/groupsControllerFE.js');
const commentsControllerFE = require('../controllers/frontend/commentsControllerFE.js');
const searchControllerFE = require('../controllers/frontend/searchControllerFE.js');


module.exports = function (){
    /* PUBLIC AREA */
    router.get('/', homeController.home);

    //Show a connecti

    router.get('/connecti/:slug',
    connectisControllerFE.showConnecti
    )

    //Confirm the assistance to a connecti
    router.post('/confirm-assistance/:slug', connectisControllerFE.confirmAssistance);

    //Show attendees to a connecti
    router.get('/attendees/:slug', connectisControllerFE.showAttendees);

    //Add connecti comments
    router.post('/connecti/:id',commentsControllerFE.addComment);

    //Remove connecti comments
    router.post('/delete-comment',commentsControllerFE.deleteComment);

    //Show profiles to the frontend
    router.get('/users/:id', usersControllerFE.showUser);

    //Show groups to the frontend
    router.get('/groups/:id', groupsControllerFE.showGroup);

    //Show connecti's by category
    router.get('/category/:category', connectisControllerFE.showCategory);

    //Search
    router.get('/search', searchControllerFE.search);

    /** Create and confirm accounts **/
    router.get('/sign-up', usersController.createAccountForm);
    router.post('/sign-up', usersController.createNewAccount);
    router.get('/confirm-account/:email', usersController.confirmAccount);

    //Sign in
    router.get('/sign-in', usersController.signInForm);
    router.post('/sign-in', authController.authenticateUser);

    /* PRIVATE AREA */
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

    //Edit profile information
    router.get('/edit-profile',
    authController.authenticatedUser,
    usersController.editProfileForm
    );

    router.post('/edit-profile',
    authController.authenticatedUser,
    usersController.editProfile
    );

    //Change password
    router.get('/change-password',
    authController.authenticatedUser,
    usersController.changePasswordForm
    );

    router.post('/change-password',
    authController.authenticatedUser,
    usersController.changePassword
    );

    // Profile images
    router.get('/img-profile',
    authController.authenticatedUser,
    usersController.uploadImageForm
    );

    router.post('/img-profile',
    authController.authenticatedUser,
    usersController.uploadImage,
    usersController.saveProfileImage
    );

    //Log out
    router.get('/log-out',
    authController.authenticatedUser,
    authController.logOut
    )

    return router
}