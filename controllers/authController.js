const passport = require('passport');

exports.authenticateUser = passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/sign-in',
    failureFlash: true,
    badRequestMessage: 'Both fields are required'
});