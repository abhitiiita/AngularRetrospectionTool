'use strict';
module.exports = function(nodemailer) {
	return nodemailer.createTransport({
    	service: 'gmail',
    	auth: {
        	user: '**********@gmail.com',
        	pass: '*******'
    	}
	});
};