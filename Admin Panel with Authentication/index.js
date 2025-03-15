const express = require("express");

const port = 9000;

const app = express();

app.set('view engine','ejs');

const path = require('path');
app.use('/',express.static(path.join(__dirname, 'public'))) 

const db = require('./config/db');

app.use(express.urlencoded());

const cookieparser = require('cookie-parser');
app.use(cookieparser());

//Login system passpportJS start

const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');

app.use(session({
    name : 'brijal',
    secret : 'briee',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

//Login system passpportJS end


// Flash Message Code Start
const flash = require('connect-flash');
app.use(flash());
app.use('/', (req, res, next) => {
    res.locals.message = req.flash();
    return next();
})
// Flash Message Code End

app.use('/',require('./routes/indexRoute'));

app.listen(port,(err) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port :- ${port}`);
})