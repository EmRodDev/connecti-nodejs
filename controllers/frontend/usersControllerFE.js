const Users = require('../../models/Users.js');
const Groups = require('../../models/Groups.js');

exports.showUser = async (req, res, next) => {
    let queries = [];

    //Queries at the same time
    queries.push( Users.findOne({where: {id: req.params.id}}));
    queries.push( Groups.findAll({where: {userId: req.params.id}}));

    const [user, groups] = await Promise.all(queries);

    if(!user){
        res.redirect('/');
        return next();
    }

    //Show the view
    res.render('show-profile',{
        namePage: `User Profile: ${user.name}`,
        user,
        groups
    });
}