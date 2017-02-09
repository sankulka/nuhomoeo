'use strict';

var fs = require('fs');
var moment = require('moment');
var auth = require('../config/auth');
var cache = require('./models/cache');
var googleapis = require('googleapis');
var driveService = googleapis.drive('v3');
var TESTIMONIAL_PATH = './public/testimonials/';
var TESTIMONIAL_FILE = './public/testimonials/testimonials.json';

module.exports = function (app) {

	// Get list of activities for the given patient
	app.get('/testimonials', function(req, res) {
		fs.exists(TESTIMONIAL_FILE, function(exists) {
			if(exists) {
				fs.readFile(TESTIMONIAL_FILE, 'utf8', function(err, data) {
					if (err) {
						console.log('Error in reading Testimonial File ' + err);
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
	});
	
	app.delete('/testimonial/:date', function(req, res) {
		var date = req.params.date;
		if (date == null)
			res.redirect('/');
		
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.redirect('/');
		}
		
		console.log('Deleting the Testimonial for date: ' + date);
		fs.exists(TESTIMONIAL_FILE, function(exists) {
			if(exists) {
				fs.readFile(TESTIMONIAL_FILE, 'utf8', function(err, data) {
					if (err) {
						console.log('Error in reading Testimonial File ' + err);
					} else {
						var newRows = [];
						var existingRows = JSON.parse(data);
						if (existingRows == null || existingRows.length == 0)
							res.redirect('/');
						
						for (var ii = 0; ii < existingRows.length; ii++) {
							if (existingRows[ii].date == date) {
								var filesToDelete = existingRows[ii].files;
								for (var jj = 0; jj < filesToDelete.length; jj++) {
									var file = TESTIMONIAL_PATH + filesToDelete[jj];
									fs.unlink (file, function(error) {
										if (error)
											console.log('Error in deleting the file');
										else 
											console.log('Successfully deleted the file: ' + file);
									});
								}
							} else
								newRows.push(existingRows[ii]);
						}
						fs.writeFile(TESTIMONIAL_FILE,
							JSON.stringify(newRows), 'utf8');
						console.log('Testimonial file is updated');

						res.json({});
					}
				});
			}
		});
	});

	// Create the Testimonial for a given patient
	app.post('/testimonials/:patientId', function(req, res) {
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.redirect('/');
		}
		
		var patientId = req.params.patientId;
		console.log('Creating Testimonial for the patient: ' + patientId);
		var activities = req.body;
		var notes = [];
		var files = [];
		for (var ii = 0; ii < activities.length; ii++) {
			var activity = activities[ii];
			switch(activity[1]) {
				case 'Notes':
					notes.push(activity[2]);
				break;
				default: // this is for all images/pdf
					var fileId = activity[3];
					var fileName = patientId + '-' + activity[2];
					var dest = fs.createWriteStream(TESTIMONIAL_PATH + fileName);

					driveService.files.get({'auth': auth.googleClient, fileId: fileId, alt: 'media'})		
					.on('end', function() {
						console.log(fileName + ' got for Testimonial');
					})
					.on('error', function(err) {
						console.log('Error during creating file for Testimonial', err);
					})
					.pipe(dest);

					files.push(fileName);
				break;
			}
		}
		
		var complaints = JSON.parse(cache.cacheService.getComplaintsById (patientId));
		var primaryCom = complaints.primaryCom;
		var secondaryCom = complaints.secondaryCom;
	
		var heading;
		if (secondaryCom != '' && primaryCom != '')
			heading = primaryCom + ', ' + secondaryCom;
		else if (primaryCom != '')
			heading = primaryCom;
		else
			heading = "Testimonial";

		var rowEntry = {
			'date': new moment().format('YYYY-MM-DDTHH:mm:ssZ'),
			'heading': heading,
			'notes': notes,
			'files': files
		};

		fs.exists(TESTIMONIAL_FILE, function(exists) {
			if(exists) {
				fs.readFile(TESTIMONIAL_FILE, 'utf8', function(err, data) {
					if (err) {
						console.log('Error in reading Testimonial File ' + err);
					} else {
						var obj;
						if (data != "")
							obj = JSON.parse(data);
						else
							obj = {};
						
						obj.unshift(rowEntry);
						fs.writeFile(TESTIMONIAL_FILE,
							JSON.stringify(obj), 'utf8');
						console.log('Testimonial is appended to the file');
					}
				});
			}
			else {
				var obj = [];
				obj.push(rowEntry);
				fs.writeFile(TESTIMONIAL_FILE,
					JSON.stringify(obj), 'utf8');
				console.log('Testimonial file is created');
			}
			res.redirect('/');
		});
	});
};