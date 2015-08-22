'use strict';
module.exports = function(nodemailer) {
	return nodemailer.createTransport({
    	service: 'gmail',
    	auth: {
        	user: 'abhit.geek@gmail.com',
        	pass: 'abhinav()#@!'
    	}
	});
};