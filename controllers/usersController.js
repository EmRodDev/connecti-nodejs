const Users = require('../models/Users.js');
const sendEmail = require('../handlers/email.js');

exports.createAccountForm = (req,res) => {
    res.render('create-account', {
        namePage: 'Create account'
    });
};

exports.createNewAccount = async (req,res) => {
    const user = req.body;

    req.checkBody('repeat_password', 'The "repeat password" field cannot be empty').notEmpty();
    req.checkBody('repeat_password', 'The passwords are different').equals(req.body.password);

    //Read Express errors
    const expressErrors = req.validationErrors();


    try{
        const newUser = await Users.create(user);

        //Generate confirmation url

        const url = `http://${req.headers.host}/confirm-account/${user.email}`
    
        //Send email confirmation
        await sendEmail.sendEmail({
            user,
            url,
            subject: 'Confirm your account',
            file: 'confirm-account'
        });

        //Flash message and redirect
        req.flash('success', 'We have sent an email to your inbox, confirm your account');
        res.redirect('/sign-in');
        
    }catch(err){
        let sequelizeErrors;
        if(err.errors){
            sequelizeErrors = err.errors.map(err => err.message);
        }else{
            console.error(err);
            return;
        }
        
        
        //Only extract the 'msg' key from Express errors
        let errExp;
        if(expressErrors){
            errExp = expressErrors.map(err => err.msg);
        }else{
            console.error(err);
            return;
        }
        
        //Join them
        const errorsList = [...sequelizeErrors, ...errExp];

        req.flash('error', errorsList);
        res.redirect('/sign-up');
    }
    
};

// Confirm the user suscription

exports.confirmAccount = async (req, res, next) => {
    //Verify that the user exists
    const user = await Users.findOne({where: {email: req.params.email}});

    //If doesn't exist, redirect
    if(!user){
        req.flash('error','That account does not exist');
        res.redirect('/sign-up');
        return next();
    }

    //If exists, confirm subscription and redirect
    user.active = 1;
    await user.save();
    req.flash('success','The account has been confirmed, you can now sign in');
    res.redirect('/sign-in');

    
}


//Sign in form

exports.signInForm = (req,res) => {
    res.render('sign-in', {
        namePage: 'Sign in'
    });
};