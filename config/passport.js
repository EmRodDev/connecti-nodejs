const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Users = require('../models/Users.js');

passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async(email, password, next) => {
        //This code executes when the form is filled
        const user = await Users.findOne({where: {email}});

        //Check if exists or not
        if(!user) return next(null, false, {
            message: 'That user does not exist'
        });

        //Check if its verified
        if(user.active == 0) return next(null, false, {
            message: 'You must verify your account before signing in'
        });

        //The user exists, compare its password
        const verifyPass = user.validatePassword(password);

        //If the password is wrong
        if(!verifyPass) return next(null, false, {
            message: 'Wrong password'
        });

        //All good
        return next(null, user);
    }
));

passport.serializeUser((user,cb)=> {
    cb(null, user);
});

passport.deserializeUser((user,cb)=> {
    cb(null, user);
});

module.exports = passport;