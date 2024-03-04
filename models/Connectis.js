const Sequelize = require('sequelize');
const db = require('../config/db');
const uuid = require('uuid');
const slug = require('slug');
const shortid = require('shortid');
const Users = require('../models/Users.js');
const Groups = require('../models/Groups.js');

const Connectis = db.define('connectis',{
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid.v4(),
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add a title'
            }
        }
    },
    slug: {
        type: Sequelize.STRING
    },
    guest: Sequelize.STRING,
    quota: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add a description'
            }
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add a date'
            }
        }
    },
    hour: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add an hour'
            }
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add an address'
            }
        }
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add a city'
            }
        }
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add a state'
            }
        }
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Add a country'
            }
        }
    },
    location: {
        type: Sequelize.GEOMETRY('POINT'),
    },
    interested: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    }
}, 
{
    hooks: {
        async beforeCreate(connecti){
            const url = slug(connecti.title).toLowerCase();
            connecti.slug = `${url}-${shortid.generate()}`;
            
        }
    }
}
);

Connectis.belongsTo(Users);
Connectis.belongsTo(Groups);

module.exports = Connectis;