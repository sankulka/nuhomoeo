'use strict';

var auth = require('../config/auth');
var cache = require('./models/cache');
var acute = require('./models/acute');
var payment = require('./models/payment');
var calendar = require('./models/calendar');
var email = require('./emailJob');
var appointments = require('./routes-appointments');

module.exports = function (app) {

	/* Redirect user to OAuth 2.0 login URL */
	app.get('/login', function(req, res) {
		var authenticationUrl = auth.googleClient.generateAuthUrl({scope: auth.scopes});
		console.log('redirecting to authentication url: ' + authenticationUrl);
		res.redirect(authenticationUrl);
	});

	/* Use OAuth 2.0 authorization code to fetch user's profile */
	app.get('/oauth2callback', function(req, res, next) {
		console.log('oauth2callback done. Redirecting to dashboard');
		auth.googleClient.getToken(req.query.code, function(err, tokens) {
			if (err) {
				console.log('Unsuccessful login:' + err + ' Redirecting to home site');
				res.redirect('/'); // Unsuccessful Message
			} else {
				auth.googleClient.setCredentials(tokens);
				cache.cacheService.initialize(function(error) {
					if (error) {
						console.log('Unsuccessful login. Redirecting to home site. ' + error);
						res.redirect('/'); // Unsuccessful Message
					} else {
						console.log('Launching dashboard');
						email.kickoffJob();
						acute.cacheService.initialize();
						payment.cacheService.initialize();
						calendar.synchAppointments(function () {
							res.redirect('./pms.html#!/dashboard');
						});
					}
				});
			}
		});
	});

	/* Clear the session */
	app.get('/logout', function(req, res) {
		cache.cacheService.clear();
		auth.googleClient.setCredentials(null);
		req.session = null;
		res.redirect('/'); // Change to hosting site
	});	
};