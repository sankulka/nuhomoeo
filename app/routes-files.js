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

	// Get list of files for the given patient
	app.get('/files/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Getting files for the patient: ' + patientId);
		var filesId = cache.cacheService.getFilesId(patientId);
		if(filesId == undefined || filesId == '') {
			console.log('Cache is not yet initialized.');
			res.json({});
			return;
		}
		
		res.json(filesId);
	});

	// Get list of files for the given patient
	app.get('/old-files/:patientId', function(req, res) {
		console.log('Getting files for the patient: ' + patientId);
		var folderDetails = cache.cacheService.getPatientFolderDetails(patientId);
		var details = folderDetails.details;
		
		sheet.getRows(details, 'Activities', function(rows) {
			for (var ii = 0; ii < rows.length; ii++) {
				if (rows[ii] == 'Notes' ||
					rows[ii] == 'Email' ||
					rows[ii] == 'Appointment') {
						rows.splice(ii, 1); // remove at ii index and 1 item
					ii--;
				}
			}
			console.log('Number of files for this patient: ' + rows.length);
			res.json(rows);
		});
	});
	
	// Upload the file for a given patient
	app.post('/files/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Uploading file for the patient: ' + patientId);
		var folderDetails = cache.cacheService.getPatientFolderDetails(patientId);
		if(folderDetails == undefined || folderDetails == null) {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		
		// create an incoming form object
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var file = files.file
			var fileMetadata = {
				'name': file.name,
				'parents': [folderDetails.files],
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
				fields: 'id,webViewLink'
			}, function(err, newFile) {
				if(err)
					console.log(err);
				else {
					console.log('Uploaded new file: ' , newFile.id);
					var rowEntry = [];
					rowEntry.push(new moment().format('YYYY-MM-DDTHH:mm:ssZ'));
					rowEntry.push(file.type);
					rowEntry.push(file.name);
					rowEntry.push(newFile.id);
						
					rowEntry.push(newFile.webViewLink);

					console.log('Uploaded file: ' + rowEntry);
					sheet.appendRow(folderDetails.details, 'Activities', rowEntry, function() {
						console.log('New file information is updated in Details sheet');
						res.redirect({});
					});
				}
			});
		});
	});
};