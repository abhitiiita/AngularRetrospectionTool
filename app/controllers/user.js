'use strict';

var User = require('../models/user');
var ResetToken = require('../models/resetToken');
var jwt = require('jsonwebtoken');
var config = require('../../config/database.js');

module.exports.getUsersByTeam = function(req, res) {
	User.find({team:req.params.team}).exec(function(err, users) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(users);
		}

	});
};

module.exports.resetPasswordPhase1 = function(req, res, transporter) {
	User.findOne({email:req.params.userEmail}).exec(function(err, user) {
		if(err) return res.status(400).send({message:'Unable to fetch data try again'});
		if(!user) {
			return res.json({success:false, resetToken:null, 
				errorMsg: 'Unable to find user by this emailid. Please check the email id provided'});
		}
		//generate hash token for resetting and save in db
		var hashToken = Math.random().toString(36).slice(-16);
		var resetToken = new ResetToken();
		resetToken.hashToken = hashToken;
		resetToken.userId = user._id;
		resetToken.save(function(err) {
			if (err) {
				return res.status(400).send({message:'Unable to save resetToken'});
			} else {
				//send mail to user with hashtoken
				 transporter.sendMail({
    				from: 'admin@retrospection.com',
    				to: user.email,
    				subject: 'Retrospection password reset',
    				text: 'Please click on the link to reset your password. http://'+req.headers.host+'/#/resetpassword/'+resetToken.hashToken
				}, function(error, response) {
					if(error) {
						res.json({success:false, resetToken: '', errorMsg:error});
					}
					res.json({success:true, resetToken:resetToken, errorMsg:''});
				});
				
			}
		});
	});
};

module.exports.resetPasswordPhase2 = function(req, res) {
	ResetToken.findOne({hashToken: req.params.resetToken}).exec(function(err, resetToken) {
		if(err) return res.status(400).send({message:'Unable to fetch from resetToken table'});
		//check for date and add functionality of expired link
		if(!resetToken) {
			res.json({isValid: false, userID: null});
		} else {
			res.json({isValid : true, userId: resetToken.userId});
		}
		
	});
};

module.exports.updatePassword = function(req, res) {
	User.findById(req.params.userId).exec(function(err, user) {
		if(err) return res.status(400).send({message: 'Unable to fetch user from DB'});
		user.password = user.generateHash(req.body.value);
		user.save(function(err) {
			if(err) return res.status(400).send({message: 'Unable to update password to DB'});
			res.json({success:true, user:user});
		})
	});
};

module.exports.delete = function(req, res) {
	User.remove({_id:req.params.userId}).exec(function(err, result) {
		if(err) {
			return res.status(400).send({message:'Unable to delete try again'});
		}
		res.json(result);
	});
};

module.exports.requiresLogin = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(!token) {
		return res.status(401).send({
			success:false,
			message:'No token provided'
		});
	}

	jwt.verify(token, config.tokenSecret, function(err, decoded) {
		if(err) {
			return res.status(401).send({
				success: false, 
				message: 'Failed to authenticate token'
			});
		} else {
			req.user = decoded;
			next();
		}
	});
};
