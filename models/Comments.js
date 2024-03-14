const Sequelize = require('sequelize');
const db = require('../config/db.js');
const Users = require('./Users.js');
const Connectis = require('./Connectis.js');

const Comments = db.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: Sequelize.TEXT
}, {
    timestamps: false
});

module.exports = Comments;

Comments.belongsTo(Users);
Comments.belongsTo(Connectis);