const Groups = require('../models/Groups.js');

exports.adminPanel = async(req, res) => {
    const groups = await Groups.findAll({where: {userId: req.user.id}});



    res.render('admin', {
        namePage: 'Administration Panel',
        groups
    })
}