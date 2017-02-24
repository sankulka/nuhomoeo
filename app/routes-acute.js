'use strict';

var moment = require('moment');
var sheet = require('./models/sheet');
var cache = require('./models/cache');
var acute = require('./models/acute');
var payment = require('./models/payment');
var prescriptions = require('./models/prescriptions');

module.exports = function (app) {

/*
0	A	Date
1	B	Phone
2	C	Name
3	D	Notes
4	E	Followup
*/
	// Get Acute Followup for all patients
	app.get('/acute', function(req, res) {
		console.log('Getting the list of all acute Records');
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		else {
			var records = [];
			var rows = acute.cacheService.getAcuteCache();
			console.log('Number of acute records: ' + rows.length);
			for (var ii = rows.length-1; ii >= 0; ii--) {
				var record = {
					'date': rows[ii][0],
					'dateTime': moment(rows[ii][0]).format('lll'),
					'phone': rows[ii][1],
					'name': rows[ii][2],
					'notes': rows[ii][3],
					'followup': JSON.parse(rows[ii][4])
				};
				records.push(record);
			}
			res.json(records);
		}
	});
	
	// Post the Acute Followup
	app.post('/acute/', function(req, res) {

		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.json('/');
		}

		var now = new moment().format('YYYY-MM-DDTHH:mm:ssZ');
		var record = req.body;
		if (record == null || record == undefined) {
			console.log('Empty record entry');
			res.json('/');
		}
		
		// --> Optimize Range for only two columns
		if (record.update) {
			sheet.getRows(masterSheet, 'Acute', function(rows) {
				for (var ii = 0; ii < rows.length; ii++) {
					if (rows[ii][0] == record.date && rows[ii][1] == record.phone) {
						prescriptions.addPrescription(record.date, record.name, record.followup.treatments);
	
						var newRecord = [];
						newRecord.push(record.date);
						newRecord.push(record.phone);
						newRecord.push(record.name);
						newRecord.push(record.notes);
						newRecord.push(JSON.stringify(record.followup));

						var range = 'Acute!A' + (ii+1) + ':E' + (ii+1);
						sheet.updateRow(masterSheet, range, newRecord, function () {
							console.log('Acute entry is updated successfully');
							acute.cacheService.updateRecord(newRecord);
							res.json('/');
						});
					}
				}
			});
			return;
		}
		
		prescriptions.addPrescription(record.date, record.name, record.followup.treatments);

		var rowEntry = [];
		rowEntry.push(now);
		rowEntry.push(record.phone);
		rowEntry.push(record.name);
		rowEntry.push(record.notes);
		rowEntry.push(JSON.stringify(record.followup));
		
		acute.cacheService.addRecord(rowEntry, function() {
			var billing = record.billing;
			if (billing != null && billing != undefined && billing.raised > 0) {
				var paymentEntry = [];
				paymentEntry.push(now);
				paymentEntry.push(record.phone);
				paymentEntry.push(record.name);
				paymentEntry.push(JSON.stringify(billing));

				payment.cacheService.addRecord(paymentEntry, function (){});
			}
			res.redirect('/');
		});
	});
};