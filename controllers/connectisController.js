const Groups = require('../models/Groups.js');
const Connectis = require('../models/Connectis.js');
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2/index.js');
const uuid = require('uuid');


//Show the form for new Connecti

exports.newConnectiForm = async(req, res) => {
    const groups = await Groups.findAll({where: {userId: req.user.id}});

    res.render('new-connecti', {
        namePage: 'Create new Connecti',
        groups
    })
}

//Sanitize the Connectis
exports.sanitizeConnecti = async(req,res,next) => {
    req.sanitizeBody('title');
    req.sanitizeBody('guest');
    req.sanitizeBody('quota');
    req.sanitizeBody('date');
    req.sanitizeBody('hour');
    req.sanitizeBody('address');
    req.sanitizeBody('city');
    req.sanitizeBody('state');
    req.sanitizeBody('country');
    req.sanitizeBody('lat');
    req.sanitizeBody('lng');
    req.sanitizeBody('groupId');

    next();
}


//Insert new Connectis on the DB
exports.newConnecti = async(req, res) => {
    
    //Get the data
    const connecti = req.body;
    
    //Assign the user
    connecti.userId = req.user.id;

    //Store the location with a point
    const point = { type: 'Point', coordinates : [parseFloat(connecti.lat), parseFloat(connecti.lng)]};

    connecti.location = point;

    //Optional quota
    if(connecti.quota === ''){
        connecti.quota = 0;
    }

    //Assign the UUID

    connecti.id = uuid.v4();

    //Store on the DB
    try{
        await Connectis.create(connecti);
        req.flash('success','The Connecti was created successfully');
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
        res.redirect('/new-connecti');
    }
}

//Show the form to edit a Connecti

exports.editConnectiForm = async (req, res, next) => {
    let queries = [];

    queries.push( Groups.findAll({where: {userId: req.user.id}}));
    queries.push( Connectis.findByPk(req.params.id));

    //Return a promise
    const [groups, connecti] = await Promise.all(queries);

    if(!groups || !connecti){
        req.flash('error', 'Invalid operation');
        res.redirect('/');
        return next();
    }

    //Show the view
    res.render('edit-connecti', {
        namePage: `Edit Connecti: ${connecti.title}`,
        groups,
        connecti
    })
}

//Store the changes on the Connecti

exports.editConnecti = async (req,res,next) => {
    const connecti = await Connectis.findOne({where: {id: req.params.id, userId: req.user.id}});

    if(!connecti){
        req.flash('error', 'Invalid operation');
        res.redirect('/');
        return next();
    }

    //Assign the values
    const {groupId, title, guest, date, hour, quota, description, address, city, state, country, lat, lng} = req.body;

    connecti.groupId = groupId;
    connecti.title = title;
    connecti.guest = guest;
    connecti.date = date;
    connecti.hour = hour;
    connecti.quota = quota;
    connecti.description = description;
    connecti.address = address;
    connecti.city = city;
    connecti.state = state;
    connecti.country = country;
    
    //Assign the point
    const point = {type: 'Point', coordinates: [parseFloat(lat), parseFloat(lng)]};

    connecti.location = point;

    await connecti.save();
    req.flash('success','Changes saved successfully');
    res.redirect('/admin');

}

//Show the form to delete a Connecti
exports.deleteConnectiForm = async (req, res, next) => {
    const connecti = await Connectis.findOne({where: {id: req.params.id, userId: req.user.id}});

    if(!connecti){
        req.flash('error', 'Invalid operation');
        res.redirect('/');
        return next();
    }

    //Show the view
    res.render('delete-connecti', {
        namePage: `Delete Connecti: ${connecti.title}`
    })
}

exports.deleteConnecti = async (req, res, next) => {
    const connecti = await Connectis.findOne({where: {id: req.params.id, userId: req.user.id}});

    if(!connecti){
        req.flash('Error', 'Invalid operation');
        res.redirect('/');
        return next();
    };

    //Delete the group
    await Connectis.destroy({
        where: {
            id: req.params.id
        }
    });

    //Redirect
    req.flash('success', 'Deleted group successfully');
    res.redirect('/admin');
}