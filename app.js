const express = require('express');
const config = require('./src/config');
const loaders = require('./src/loaders');
const path = require('path');
const {userRoutes, publicRoutes} = require('./src/routers');
const session = require('express-session');
const {flash} = require('express-flash-message');
const passport = require('passport');


config();
loaders();

const app = express();

//template engine
const ejs = require('ejs');
const expressEjsLayouts = require('express-ejs-layouts');
app.set('view engine','ejs');
app.set('views', path.resolve(__dirname,'./src/views'));
app.use(expressEjsLayouts);
//template engine

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000*120 //2 hour session time
    }
}));

app.use(flash({sessionKeyName:'flashMessage'}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/user', userRoutes);
app.use('/',publicRoutes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
})
