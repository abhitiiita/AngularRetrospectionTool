'use strict';
//major pages -- Home page, login page, signup page, post for login and sigup, profile page
var users = require('../controllers/user');

module.exports = function(app, passport, transporter) {

	//Home page with login links
/*	app.get('/', function(req, res) {
		res.render('index.ejs');
	}); */

	app.get('/resetpassword/user/:userEmail', function(req, res) {
		users.resetPasswordPhase1(req, res, transporter)
	});

	app.get('/resetpassword/:resetToken', users.resetPasswordPhase2);

	app.get('/users/me', users.requiresLogin, users.getUserByID);

	app.post('/users/password/:userId', users.updatePassword);

	app.post('/users/team/:userId', users.updateTeam);

	app.get('/users/:team', users.requiresLogin, users.getUsersByTeam);

	app.route('/users/:userId')
		.delete(users.requiresLogin, users.delete);

	//login page
	app.post('/auth/login', function(req, res, next) {
  		passport.authenticate('local-login', function(err, user, info) {
    		if (err)  return next(err); 
    		if (!user) return res.json({errorMsg: info, user: null});
    		req.logIn(user, function(err) {
      			if (err) return next(err);
      			return res.json({errorMsg: '', user: req.user, token: info});
    		});
  		})(req, res, next);
	});

	//signup page
	app.post('/auth/signup', function(req, res, next) {
  		passport.authenticate('local-signup', function(err, user, info) {
    		if (err)  return next(err); 
    		if (!user) return res.json({errorMsg: info, user: null});
    		req.logIn(user, function(err) {
      			if (err) return next(err);
      			return res.json({errorMsg: '', user: req.user, token:info});
    		});
  		})(req, res, next);
	});

	app.get('/auth/logout', function(req, res){
		req.logout(); //this function is provided by passport
		return res.json({success:true});
	});
};