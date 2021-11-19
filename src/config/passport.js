const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = require("../app");
const User = mongoose.model('User') ;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log({email: email, password: password});
    User.findOne({ email: email })
        .then((user) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            else {
                return done(null, user);
            }
        }).catch(done);
}));