const Sequelize = require('sequelize');
const db = require('../config/db.js');
const uuid = require('uuid');
const Categories = require('./Categories.js');
const Users = require('./Users.js');

const Groups = db.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid.v4()
    },
    name: {
        type: Sequelize.TEXT(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The group must have a name'
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Write a description'
            }
        }
    },
    url: Sequelize.TEXT,
    image: Sequelize.TEXT
});

Groups.belongsTo(Categories);
Groups.belongsTo(Users);

module.exports = Groups;