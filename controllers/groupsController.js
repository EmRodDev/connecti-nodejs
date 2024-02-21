const Categories = require ('../models/Categories.js');
const Groups = require ('../models/Groups.js');

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
}