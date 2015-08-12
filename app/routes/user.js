'use strict';
//major pages -- Home page, login page, signup page, post for login and sigup, profile page
var users = require('../controllers/user');

module.exports = function(app, passport) {

	//Home page with login links
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/users/:team', users.getUsersByTeam);
	app.get('/isLoggedIn', function(req, res) {
		console.log("isLoggedIn called");
		if(req.isAuthenticated()) {
			console.log(req.user);
				res.json(req.user);
		}
		console.log("returning null");
			res.json(null);
	});

	//login page
	app.post('/auth/login', function(req, res, next) {
  		passport.authenticate('local-login', function(err, user, info) {
    		if (err)  return next(err); 
    		if (!user) return res.json({errorMsg: info, user: null});
    		req.logIn(user, function(err) {
      			if (err) return next(err);
      			return res.json({errorMsg: info, user: req.user});
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
      			return res.json({errorMsg: info, user: req.user});
    		});
  		})(req, res, next);
	});

	app.get('/auth/logout', function(req, res){
		req.logout(); //this function is provided by passport
		return res.json({success:true});
	});

};

function isLoggedIn(req, res, next){
	//if user is authenticated in the session, carry on
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	return next();
}