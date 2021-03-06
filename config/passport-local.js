'use strict';

var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

//Serialize and Unserialize user means putting user into session and 
// take it out from session
module.exports = function(passport, app){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });


//####################################################
//Signup Strategy

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log(email);
        //asynchronous
        //User.findOne wont fire unless data is sent back
        process.nextTick(function(){
            User.findOne({'email' :  email}, function(err, user){
                if(err)
                    return done(err);
                if(user){
                    return done(null, false, 'That email is already exist');
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.team = req.body.team;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        // create a token
                        var token = jwt.sign(newUser, app.get('tokenSecret'), {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        return done(null, newUser, token);
                    });
                }
            });
        });
    }));


//########################################################
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true //allows us to pass back the entire request to the callback
        }, function(req, email, password, done){
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email },'+password', function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false, 'No user found.'); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            // create a token
            var token = jwt.sign(user, app.get('tokenSecret'), {
                    expiresIn: 86400 // expires in 24 hours
            });
            return done(null, user, token);
        });
    }));
};
