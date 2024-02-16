const Sequelize = require('sequelize');
require('dotenv').config({path: '.env'});

module.exports = new Sequelize('connecti',process.env.DB_USER,process.env.DB_PASS, {
    host: '127.0.0.1',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});