const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;

const Connectis = require('../../models/Connectis.js');
const Groups = require('../../models/Groups.js');
const Categories = require('../../models/Categories.js');
const Users = require('../../models/Users.js');
const Comments = require('../../models/Comments.js');

exports.showConnecti = async (req, res, next) => {
    const connecti = await Connectis.findOne(
        {
            where: {
                slug: req.params.slug
            },
            include : [
                {
                    model: Groups
                },
                {
                    model: Users,
                    attributes: ['id','name','image']
                }
            ]
        }
    );

    //If it doesnt exists
    
    if(!connecti) res.redirect('/');

    //Consult near connecti's
    const location = Sequelize.literal(`ST_GeomFromText('POINT(${connecti.location.coordinates[0]} ${connecti.location.coordinates[1]})')`);

    // ST_DISTANCE_Sphere = Returns a line in meters
    const distance = Sequelize.fn('ST_DistanceSphere', Sequelize.col('location'), location);

    //Find near connecti's
    const near = await Connectis.findAll({
        order: distance, //Order them from the nearest to the farthest
        where: Sequelize.where(distance, {[Op.lte] : 2000}), //2km
        limit: 3, //Maximum 3
        offset: 1, //Ignore the first match
        include : [
            {
                model: Groups
            },
            {
                model: Users,
                attributes: ['id','name','image']
            }
        ]
    });

    //Request after verifying that the connecti exists
    const comments = await Comments.findAll({ 
        where: {connectiId: connecti.id},
        include: [{
            model: Users,
            attributes: ['id','name','image']
        }]
    });

    res.render('show-connecti', {
        namePage: connecti.title,
        connecti,
        comments,
        near,
        moment
    })
}

exports.confirmAssistance = async(req, res) => {
    const {actionInput : action} = req.body;

    if(action == 'confirm'){
        //Add the user
        Connectis.update(
            {'interested' : Sequelize.fn('array_append', Sequelize.col('interested'), req.user.id)},
            {'where': {'slug': req.params.slug} }
        );

        //Message
        res.send('You have confirmed your assistance')
    }else{
        //Remove the user
        Connectis.update(
            {'interested' : Sequelize.fn('array_remove', Sequelize.col('interested'), req.user.id)},
            {'where': {'slug': req.params.slug} }
        );

        //Message
        res.send('You have cancelled your assistance')
    }

    
}

//Show the listing of attendees

exports.showAttendees = async (req, res) => {
    const connecti = await Connectis.findOne({
        where: {slug: req.params.slug},
        attributes: ['interested']
    });

    //Extract attendees
    const { interested } = connecti;
    
    const attendees = await Users.findAll({
        where: {id: interested},
        attributes: ['name','image','id']
    });

    // Create the view and send data

    res.render('attendees-connecti',{
        namePage: 'Connecti Attendees List',
        attendees
    });
}

//Show the connectis grouped by category

exports.showCategory = async (req, res, next) => {
    const category = await Categories.findOne({
        attributes: ['id','name'],
        where: {slug : req.params.category}
    });
    const connectis = await Connectis.findAll({
        order: [
            ['date','ASC'],
            ['hour','ASC']
        ],
        include: [
            {
                model: Groups,
                where: {categoryId : category.id}
            },
            {
                model: Users
            }
        ]
    });

    res.render('category', {
        namePage: `Category: ${category.name}`,
        connectis,
        moment
    });
}