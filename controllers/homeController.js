const Categories = require('../models/Categories.js');
const Connectis = require('../models/Connectis.js');
const Groups = require('../models/Groups.js');
const Users = require('../models/Users.js');

const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.home = async (req,res) => {

    //Promise for the queries on home
    let queries = [];
    queries.push(Categories.findAll({}));
    queries.push(Connectis.findAll({
        attributes: ['slug','title','date','hour'], 
        where: {
            date: {[Op.gte]: moment(new Date()).format("YYYY-MM-DD")}
        },
        limit: 3,
        order: [
            ['date','ASC']
        ],
        include: [
            {
                model: Groups,
                attributes: ['image']
            },
            {
                model: Users,
                attributes: ['name','image']
            }
        ]
    }));
    
    //Extract and pass to the view
    const [categories, connectis] = await Promise.all(queries);

    res.render('home', {
        namePage: 'Homepage',
        categories,
        connectis,
        moment
    });
};