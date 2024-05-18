const Connectis = require('../../models/Connectis.js');
const Groups = require('../../models/Groups.js');
const Users = require('../../models/Users.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');



exports.search = async (req, res) => {
    //Read the data from the url
    const {category, title, city, country} = req.query;

    //Control the empty category
    let connectis
    if(category === ''){
        //Filter connectis by the search terms
        connectis = await Connectis.findAll({
            where: {
                title: {[Op.iLike] : `%${title}%`},
                city: {[Op.iLike] : `%${city}%`},
                country: {[Op.iLike] : `%${country}%`}
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
        });
    } else {
        //Filter connectis by the search terms
        connectis = await Connectis.findAll({
            where: {
                title: {[Op.iLike] : `%${title}%`},
                city: {[Op.iLike] : `%${city}%`},
                country: {[Op.iLike] : `%${country}%`}
            },
            include : [
                {
                    model: Groups,
                    where: {categoryId: {[Op.eq] : category}}
                },
                {
                    model: Users,
                    attributes: ['id','name','image']
                }
            ]
        });
    }


    //Send the data to the view
    res.render('search', {
        namePage: 'Search Results',
        connectis,
        moment
    })

}