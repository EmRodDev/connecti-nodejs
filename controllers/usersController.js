const Users = require('../models/Users.js');
const sendEmail = require('../handlers/email.js');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const maxSize = 2 * 1000 * 1000;

const multerConfig = {
    limits: { fileSize: maxSize},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/profiles/')
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            //The format is valid
            next(null,true);
        }else{
            //The format is invalid
            next(new Error('File format not valid'), false);
        }
    }
}

const upload = multer(multerConfig).single('image');

//Upload an image on the server
exports.uploadImage = (req, res, next) => {
    upload(req,res, function(err){
        if(err){
            //Handle errors
            if(err instanceof multer.MulterError){
                if(err.code === 'LIMIT_FILE_SIZE'){
                    req.flash('error','The image file is too large');
                }else{
                    req.flash('error', err.message);
                }
            } else if (err.hasOwnProperty('message')){
                req.flash('error', err.message);
            }
            return res.redirect('back');
            
        }else {
            next();
        }
    })
};


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

//Show a form to edit the profile
exports.editProfileForm = async (req, res) => {
    const user = await Users.findByPk(req.user.id);

    res.render('edit-profile', {
        namePage: 'Edit Profile',
        user
    })
}

//Store the changes on the DB
exports.editProfile = async (req, res) => {
    const user = await Users.findByPk(req.user.id);

    //Sanitize form
    req.sanitizeBody('name');
    req.sanitizeBody('email');

    //Read form data

    const {name, description, email} = req.body;

    //Assign the values

    user.name = name;
    user.description = description;
    user.email = email;

    //Store changes
    await user.save();
    req.flash('success','Changes saved succesfully');
    res.redirect('/admin');
}

//Show a form to modify the password

exports.changePasswordForm = (req, res) => {
    res.render('change-password', {
        namePage: 'Change Password'
    })
}

//Check if the previous password is valid and replace it for a new one
exports.changePassword = async (req, res, next) => {
    const user = await Users.findByPk(req.user.id);

    //Verify that the previous password is valid
    if(!user.validatePassword(req.body.previous)){
        req.flash('error', 'The provided actual passowrd is incorrect');
        res.redirect('/change-password');
        return next();
    }

    //If the password is valid, hash the new one
    const hash = user.hashPassword(req.body.new);

    //Assign the password to the user
    user.password = hash;

    //Store on the DB
    await user.save();

    //Redirect
    req.flash('success','Password Modified Successfully');
    res.redirect('/admin');
}

//Show the profile image upload form
exports.uploadImageForm = async (req, res) => {
    const user = await Users.findByPk(req.user.id);

    //Show the view
    res.render('img-profile', {
        namePage: 'Upload or Update Profile Image',
        user
    });


}

//Save the new image, delete the previous one if corresponds
exports.saveProfileImage = async (req, res) => {
    const user = await Users.findByPk(req.user.id);

    //If there's a previous image, delete it
    if(req.file && user.image){
        const previousImgPath = __dirname + `/../public/uploads/profiles/${user.image}`;
        
        //Delete file
        fs.unlink(previousImgPath, (err) => {
            if(err){
                console.error(err);
            }
        });
    }

    //Store the new image
    if(req.file){
        user.image = req.file.filename;
    }

    //Store on the DB and redirect
    await user.save();
    req.flash('success','Changes saved successfully');
    res.redirect('/admin');
}