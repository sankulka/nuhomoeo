'use strict';

var moment = require('moment');
var cache = require('./models/cache');
var sheet = require('./models/sheet');

module.exports = function (app) {

	// Post the notes for the given patient
	app.post('/notes/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Adding notes for the patient: ' + patientId);
		var folderDetails = cache.cacheService.getPatientFolderDetails(patientId);
		if(folderDetails.details == undefined || folderDetails.details == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}		
		
		var rowEntry = [];
		rowEntry.push(new moment().format('YYYY-MM-DDTHH:mm:ssZ'));
		rowEntry.push('Notes');
		rowEntry.push(req.body.note);

		sheet.appendRow(folderDetails.details, 'Activities', rowEntry, function() {
			console.log('Notes added in Activities sheet');
			res.redirect({});
		});
	});
};