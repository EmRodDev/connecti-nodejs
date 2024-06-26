const Sequelize = require('sequelize');
const db = require('../config/db.js');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(60),
    image: Sequelize.STRING(60),
    description: Sequelize.TEXT,
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: {msg: 'Add a valid email'}
        },
        unique: {
            args: true,
            msg: 'Email already registered'
        },
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'The password cannot be empty'
            }
        }
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tokenPassword: Sequelize.STRING,
    tokenExpires: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(user) {
            user.password = Users.prototype.hashPassword(user.password)
        }
    }
});

//Compare passwords method

Users.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
Users.prototype.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
}


module.exports = Users;