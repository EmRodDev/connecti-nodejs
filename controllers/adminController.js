const Groups = require('../models/Groups.js');
const Connectis = require('../models/Connectis.js');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.adminPanel = async(req, res) => {
    const date = new Date();

    //Queries
    let queries = [];
    queries.push(Groups.findAll({where: {userId: req.user.id}}));
    queries.push(Connectis.findAll({
        where: {
            userId: req.user.id, 
            date: {[Op.gte] : moment(date).format("YYYY-MM-DD")},
        }
    }));

    queries.push(Connectis.findAll({
        where: {
            userId: req.user.id, 
            date: {[Op.lt] : moment(date).format("YYYY-MM-DD")},
        }
    }));

    //Array destructuring
    const [groups, connectis, previous] = await Promise.all(queries);

    res.render('admin', {
        namePage: 'Administration Panel',
        groups,
        connectis,
        previous,
        moment
    })
}