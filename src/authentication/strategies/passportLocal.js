const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../models/User');
const passport = require('passport');

const options = {
    usernameField: 'email'
}
passport.use(new LocalStrategy(options, (email, password, done) => {
    UserModel.findOne({email, password},(err, user) => {
        if(!user) return done(err, false, {message: 'Email or Password is wrong!'});
        return done(null, user);
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        delete user.password;
        done(err, user);
    });
});