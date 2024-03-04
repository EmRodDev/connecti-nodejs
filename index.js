const express = require('express');
const path = require('path');
const router = require('./routes');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const expressEjsLayouts = require('express-ejs-layouts');
const passport = require('./config/passport.js');

//DB configuration and models
const db = require('./config/db.js');
require('./models/Users.js');
require('./models/Categories.js');
require('./models/Groups.js');
require('./models/Connectis.js');
db.sync().then(() => console.log('Connected to DB')).catch(err => console.error(err));

//Environment variables
require('dotenv').config({path: '.env'});

//Main application
const app = express();

//Body parser, read forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express validator (Validation with a lot of functions)
app.use(expressValidator());

//Enable EJS as template engine
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Enable cookie parser
app.use(cookieParser());

//Create the session
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Add flash messages
app.use(flash());

//Middleware (Logged user, flash messages, actual date)
app.use((req, res, next) => {
    res.locals.messages = req.flash();
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