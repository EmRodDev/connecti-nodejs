const Sequelize = require('sequelize');
const Connectis = require('../../models/Connectis.js');
const Groups = require('../../models/Groups.js');
const Categories = require('../../models/Categories.js');
const Users = require('../../models/Users.js');
const Comments = require('../../models/Comments.js');
const moment = require('moment');

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