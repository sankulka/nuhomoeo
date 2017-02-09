'use strict';

var formidable = require('formidable');
var fs = require('fs');
var moment = require('moment');
var auth = require('../config/auth');
var googleapis = require('googleapis');
var driveService = googleapis.drive('v3');
var cache = require('./models/cache');
var sheet = require('./models/sheet');

module.exports = function (app) {

	// Get list of activities for the given patient
	app.get('/working-activities/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Getting activities for the patient: ' + patientId);
		var folderDetails = cache.cacheService.getPatientFolderDetails(patientId);
		var details = folderDetails.details;
		
		sheet.getRows(details, 'Activities', function(activities) {
			if (activities) {
				console.log('Number of activities for this patient: ' + activities.length);
				res.json(activities);
			}
		});
	});

	// Get list of activities for the given patient
	app.get('/activities/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Getting activities for the patient: ' + patientId);
		var folderDetails = cache.cacheService.getPatientFolderDetails(patientId);
		var details = folderDetails.details;
		if(details == undefined || details == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		
		sheet.getRows(details, 'Activities', function(rows) {
			if (rows) {
				var activities = [];
				console.log('Number of activities for this patient: ' + rows.length);
				for (var ii = rows.length-1; ii >= 0; ii--) {
					var activity = rows[ii];
					activity[0] = moment(activity[0]).format('lll');
					switch(activity[1]) {
						case 'Email':
							activity.push('https://mail.google.com/mail/u/0/#inbox/' + activity[3]);
						break;
						case 'Followup':
							activity[2] = JSON.parse(activity[2]);
						break;
						case 'Notes':
						break;
						case 'CaseHistory':
						break;
						default: //this is for all images/pdf thumbnail
							//activity.push('https://drive.google.com/thumbnail?authuser=0&sz=w320&id=' + activity[3]);
							activity.push('https://docs.google.com/uc?id=' + activity[3]);
						break;
					}
					activities.push(activity);
				}
				res.json(activities);
			}
		});
	});
	
	// Upload the file for a given patient
	app.post('/activities/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Uploading file for the patient: ' + patientId);
		var folderDetails = cache.cacheService.getPatientFolderDetails(patientId);
		if(folderDetails.folder == undefined || folderDetails.folder == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		
		// create an incoming form object
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var file = files.file
			var fileMetadata = {
				'name': file.name,
				'parents': [folderDetails.folder],
				'mimeType': file.type // 'application/vnd.google-apps.file'
			};
			var media = {
				mimeType: file.type,
				body: fs.createReadStream(file.path)
			};
			driveService.files.create({
				'auth': auth.googleClient,
				resource: fileMetadata,
				media: media,
				fields: 'id'
			}, function(err, newFile) {
				if(err)
					console.log(err);
				else {
					console.log('Uploaded new file: ' , newFile.id);
					var rowEntry = [];
					rowEntry.push(new moment().format('YYYY-MM-DDTHH:mm:ssZ'));
					rowEntry.push(newFile.id);
					rowEntry.push(file.type);
					rowEntry.push(file.name);
					sheet.appendRow(folderDetails.details, 'Activities', rowEntry, function() {
						console.log('New file information is updated in Details sheet');
					});
				}
				res.redirect('/');
			});
		});
	});
};