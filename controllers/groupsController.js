const Categories = require ('../models/Categories.js');
const Groups = require ('../models/Groups.js');

const multer = require('multer');
const shortid = require('shortid');

const multerConfig = {
    limits: { fileSize: 100000},
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
            //TODO: Handle errors
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
        //Store on the DB>
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
}