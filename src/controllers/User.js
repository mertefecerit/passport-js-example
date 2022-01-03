const { validationResult } = require("express-validator");
const {insert, read, activateUser} = require('../services/User');
const passport = require('passport');
require('../authentication/strategies/passportLocal');
const mailler = require('../services/Mailler');
const JWT = require('jsonwebtoken');

const index = async (req, res) => {
    const successMessage = await req.consumeFlash('loginSuccess');
    res.render('user/index',{layout: './layout/auth', successMessage});
}

const loginPage = async (req, res) => {
    const loginFailMessage = await req.consumeFlash('loginError');
    const verifySuccess = await req.consumeFlash('verifySuccess');
    if(!req.user) {
        res.render('user/login', {layout: './layout/auth', loginFailMessage,verifySuccess});
    }else{
        res.redirect('/user');
    }
    
}

const registerPage = async (req, res) => {
    const errors = await req.consumeFlash('errors');
    const success = await req.consumeFlash('success');
    const fail = await req.consumeFlash('fail');
    if(!req.user) {
        res.render('user/register', {layout: './layout/auth', errors, success, fail});
    }else{
        res.redirect('/user');
    }
}

const forgotPasswordPage = (req, res) => {
    res.render('user/forgot-password', {layout: './layout/auth'});
}

const registerProcess = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        await req.flash('errors', errors.array());
        res.redirect('register');
    }else{
        insert(req.body)
        .then( async () => {
            await req.flash('success','Register Complete');
            mailler(req.body.email);
            res.redirect('register');
        })
        .catch(async (error) => {
            if(error.code === 11000){
                await req.flash('fail','Email address already registered.');
            }else{
                await req.flash('fail','Server or DB Error');
            }
            res.redirect('register'); 
        });
    }
}
const logoutProcess = (req, res, next) => {
    req.logout();
    res.redirect('/user/login');
}

const loginProcess = (req, res, next) => {
    passport.authenticate('local', async function(err, user, info){
        if(err) return next(err);
        if(!user) {
            await req.flash('loginError',{
                message: 'Email or Password is wrong!',
                email: req.body.email
            });
            return res.redirect('/user/login');
        }
        req.logIn(user, async function(err){
            if(err) return next(err);
            await req.flash('loginSuccess',{
                message: 'Login Successful'
            });
            return res.redirect('/user');
        });
    })(req, res, next);
}

const forgotPasswordProcess = (req, res) => {

}

const verify = (req, res) => {
    const {email} = JWT.decode(req.params.token,process.env.JWT_SECRET_KEY);
    activateUser(email)
    .then(async (response) => {
        if(response === null){
            await req.flash('verifySuccess',{message:"The User was already activated you can login"});
        }
        await req.flash('verifySuccess',{message:"The User activated you can login"});
        res.redirect('/user/login');
    })
    .catch(async (error) => {
        await req.flash('fail','Server or DB Error');
        res.redirect('register'); 
    });
}

module.exports = {
    index,
    loginPage,
    registerPage,
    forgotPasswordPage,
    registerProcess,
    loginProcess,
    logoutProcess,
    forgotPasswordProcess,
    verify
}