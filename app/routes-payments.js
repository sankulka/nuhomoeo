'use strict';

var moment = require('moment');
var cache = require('./models/cache');
var payment = require('./models/payment');
var sheet = require('./models/sheet');

module.exports = function (app) {

/*
0	A	Date
1	B	Phone
2	C	Name
3	D	Billing
*/
	// Get all the payment entries
	app.get('/payments', function(req, res) {
		console.log('Getting the list of all payment');
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		}
		else {
			var records = [];
			var rows = payment.cacheService.getPaymentCache();
			console.log('Number of payment records: ' + rows.length);
			for (var ii = rows.length-1; ii >= 0; ii--) {
				var record = {
					'date': rows[ii][0],
					'dateTime': moment(rows[ii][0]).format('lll'),
					'phone': rows[ii][1],
					'name': rows[ii][2],
					'billing': JSON.parse(rows[ii][3])
				};
				records.push(record);
			}
			res.json(records);
		}
	});
	
	// Post the Payment Entry
	app.post('/payments/', function(req, res) {

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
			sheet.getRows(masterSheet, 'Payment', function(rows) {
				for (var ii = 0; ii < rows.length; ii++) {
					if (rows[ii][0] == record.date && rows[ii][1] == record.phone) {
						var newRecord = [];
						newRecord.push(record.date);
						newRecord.push(record.phone);
						newRecord.push(record.name);
						newRecord.push(JSON.stringify(record.billing));
						
						var range = 'Payment!A' + (ii+1) + ':D' + (ii+1);
						sheet.updateRow(masterSheet, range, newRecord, function () {
							console.log('Payment entry is updated successfully');
							payment.cacheService.updateRecord(newRecord);
							res.json('/');
						});
					}
				}
			});
			return;
		}
		
		var rowEntry = [];
		rowEntry.push(now);
		rowEntry.push(record.phone);
		rowEntry.push(record.name);
		rowEntry.push(JSON.stringify(record.billing));
		
		payment.cacheService.addRecord(rowEntry, function() {
			res.redirect('/');
		});
	});
};