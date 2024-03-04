const Categories = require ('../models/Categories.js');
const Groups = require ('../models/Groups.js');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const maxSize = 2 * 1000 * 1000;

const multerConfig = {
    limits: { fileSize: maxSize},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/groups/')
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

exports.newGroupForm = async (req, res) => {
    const categories = await Categories.findAll();

    res.render('new-group', {
        namePage: 'Create a new group',
        categories
    })
};

//Store the groups on the DB
exports.createGroup = async (req, res) => {
    //Sanitize
    req.sanitizeBody('name');
    req.sanitizeBody('url');


    const group = req.body;

    //Store the authenticated user as the group creator
    group.userId = req.user.id;

    //Read the image
    if(req.file){
        group.image = req.file.filename;
    }
    
    
    try{
        //Store on the DB
        await Groups.create(group);
        req.flash('success', 'The group was created successfully');
        res.redirect('/admin');
    }catch(err){
        let sequelizeErrors;
        if(err.errors){
            sequelizeErrors = err.errors.map(err => err.message);
        }else{
            console.error(err);
            return;
        }

        req.flash('error', sequelizeErrors);
        res.redirect('/new-group');
    }
};

exports.editGroupForm = async(req, res) => {
    const requests = [];

    requests.push(Groups.findByPk(req.params.groupId));
    requests.push(Categories.findAll());

    //Promise with await

    const [group, categories] = await Promise.all(requests);

    res.render('edit-group', {
        namePage: `Edit group: ${group.name}`,
        group,
        categories
    });
};

//Save the changes on the DB

exports.editGroup = async(req,res,next) => {
    const group = await Groups.findOne({where: {id: req.params.groupId, userId: req.user.id}});

    //If the group doesn't exist or is not the owner
    if(!group){
        req.flash('Error', 'Invalid operation');
        res.redirect('/');
        return next();
    }

    //All good, read the values
    const {name, description, categoryId, url} = req.body;

    //Assign the values
    group.name = name;
    group.description = description;
    group.categoryId = categoryId;
    group.url = url;

    //Save changes
    await group.save();
    req.flash('success','Changes saved successfully');
    res.redirect('/admin');
};

//Show the form to edit a group's image

exports.editImgForm = async (req, res) => {
    const group = await Groups.findOne({where: {id: req.params.groupId, userId: req.user.id}});

    if(!group){
        req.flash('Error', 'Invalid operation');
        res.redirect('/');
        return next();
    }
    
    res.render('img-group', {
        namePage: `Edit image of group: ${group.name}`,
        group
    });
};

//Modify the DB image and delete the previous one
exports.editImg = async (req, res, next) => {
    const group = await Groups.findOne({where: {id: req.params.groupId, userId: req.user.id}});

    if(!group){
        req.flash('Error', 'Invalid operation');
        res.redirect('/');
        return next();
    }

    //If there is a previous image and a new one, it means we will delete the previous one
    if(req.file && group.image){
        const previousImgPath = __dirname + `/../public/uploads/groups/${group.image}`;
        
        //Delete file
        fs.unlink(previousImgPath, (err) => {
            if(err){
                console.error(err);
            }
        });
    }

    //If there is a new image
    if(req.file){
        group.image = req.file.filename;
    }

    //Store changes on the DB
    await group.save();
    req.flash('success','Changes saved successfully');
    res.redirect('/admin');
}

//Show the form to delete the group
exports.deleteGroupForm = async (req, res, next) => {
    const group = await Groups.findOne({
        where: {
            id: req.params.groupId, 
            userId: req.user.id
        }
    });

    if(!group){
        req.flash('Error', 'Invalid operation');
        res.redirect('/');
        return next();
    };

    //Execute the view
    res.render('delete-group',{
        namePage: `Delete Group: ${group.name}`
    });

}

//Delete the group and the image
exports.deleteGroup = async (req, res, next) => {
    const group = await Groups.findOne({
        where: {
            id: req.params.groupId, 
            userId: req.user.id
        }
    });

    if(!group){
        req.flash('Error', 'Invalid operation');
        res.redirect('/');
        return next();
    };

    if(group.image){
        const imgPath = __dirname + `/../public/uploads/groups/${group.image}`;

        //Delete file
        fs.unlink(imgPath, (err) => {
            if(err){
                console.error(err);
            }
        });
    }

    //Delete the group
    await Groups.destroy({
        where: {
            id: req.params.groupId
        }
    });

    //Redirect
    req.flash('success', 'Deleted group successfully');
    res.redirect('/admin');
}