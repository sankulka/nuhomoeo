'use strict';

var moment = require('moment');
var sheet = require('./models/sheet');
var cache = require('./models/cache');
var payment = require('./models/payment');
var prescriptions = require('./models/prescriptions');

module.exports = function (app) {

	// Post the Followup for the given patient
	app.post('/followup/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('Adding followup for the patient: ' + patientId);
		var info = cache.cacheService.getPatientNamePhoneFolderDetails(patientId);
		if(info.folder == undefined || info.folder == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		
		var now = new moment().format('YYYY-MM-DDTHH:mm:ssZ');				
		var billing = req.body.billing;
		if (billing != null && billing != undefined && billing.raised > 0) {
			var paymentEntry = [];
			paymentEntry.push(now);
			paymentEntry.push(info.phone);
			paymentEntry.push(info.name);
			paymentEntry.push(JSON.stringify(billing));

			payment.cacheService.addRecord(paymentEntry, function (){});
		}
		
		prescriptions.addPrescription(now, info.name, req.body.followup.treatments);

		var rowEntry = [];
		rowEntry.push(now);
		rowEntry.push('Followup');
		rowEntry.push(JSON.stringify(req.body.followup));

		sheet.appendRow(info.details, 'Activities', rowEntry, function() {
			console.log('Followup added in Activities sheet');
			res.redirect('/');
		});
	});
};