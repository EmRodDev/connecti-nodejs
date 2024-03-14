const Groups = require('../../models/Groups.js');
const Connectis = require('../../models/Connectis.js');
const moment = require('moment');


exports.showGroup = async (req, res, next) => {
    let queries = [];

    //Queries at the same time
    queries.push( Groups.findOne({where: {id: req.params.id}}));
    queries.push( Connectis.findAll({
        where: {groupId: req.params.id},
        order: [
            ['date', 'ASC']
        ]
    }));

    const [group, connectis] = await Promise.all(queries);

    if(!group){
        res.redirect('/');
        return next();
    }

    //Show the view
    res.render('show-group',{
        namePage: `Group Information: ${group.name}`,
        group,
        connectis,
        moment
    });
}