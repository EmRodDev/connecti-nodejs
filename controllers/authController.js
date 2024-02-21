const passport = require('passport');

exports.authenticateUser = passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/sign-in',
    failureFlash: true,
    badRequestMessage: 'Both fields are required'
});


//Check if the user is authenticated or not

exports.authenticatedUser = (req, res, next) => {
    
    //If the user is authenticated, go on
    if(req.isAuthenticated()){
        return next();
    }

    //If not
    return res.redirect('/sign-in');

}