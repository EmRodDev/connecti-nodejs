const express = require('express');
const path = require('path');
const router = require('./routes');
const expressEjsLayouts = require('express-ejs-layouts');

const db = require('./config/db.js');
require('./models/Users.js');
db.sync().then(() => console.log('Connected to DB')).catch(err => console.error(err));

require('dotenv').config({path: '.env'});

const app = express();

//Enable EJS as template engine

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

//Static files

app.use(express.static('public'));

//Middleware (Logged user, flash messages, actual date)
app.use((req, res, next) => {
    const date = new Date();
    res.locals.year = date.getFullYear();
    next();
});


//View locations

app.set('views', path.join(__dirname, './views'));

//Routing
app.use('/', router());

//Add the port
app.listen(process.env.PORT, () => {
    console.log('The server is working on ' + process.env.PORT)
});