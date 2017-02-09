'use strict';

var fs = require('fs');
var cache = require('./models/cache');
var UNREADEMAIL_PATH = './public/emails/';
var UNREADEMAIL_FILE = './public/emails/unread.json';

module.exports = function (app) {
		
	// Get emails from a given patient
	app.get('/emails', function(req, res) {
		console.log('Getting un-read emails from patients');
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		fs.exists(UNREADEMAIL_FILE, function(exists) {
			if(exists) {
				fs.readFile(UNREADEMAIL_FILE, 'utf8', function(err, data) {
					if (err) {
						console.log('Error in reading Email File ' + err);
					} else {
						if (data == "" || data == null || data == undefined)
							res.redirect('/');
						else {
							var obj = JSON.parse(data);
							res.json(obj);
						}
					}
				});
			}
		});		

		/*
		sheet.getRows(masterSheet, 'UnreadEmails', function(rows) {
			if (rows == null || rows == undefined || rows.length == 0) {
				console.log('No emails in the cache');
				return;
			}
			var emails = [];			
			for (var ii = 0; ii < rows.length; ii++) {
				var email = {
					id: rows[ii][0],
					name: rows[ii][1],
					date: moment(rows[ii][2]).format('lll'),
					subject: rows[ii][3]
				};
				emails.push(email);
			}
			res.json(emails);
		});*/
	});
};