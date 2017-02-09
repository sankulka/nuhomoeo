'use strict';

var cache = require('./cache');
var sheet = require('./sheet');

/*
0	A Date
1	B Phone
2 	C Name
3 	D BillRaised
4	E BillPaid
5	F Medium
6	G BillUnpaid
*/

var payment = function () {
	var paymentCache = [];

	return {
		getPaymentCache : function() {
			return paymentCache;
		},
		
		setPaymentCache : function(records) {
			paymentCache = records;
		},

		getRecordByDatePhone : function(date, phone) {
			for(var ii = 0; ii < paymentCache.length; ii++)
				if(paymentCache[ii][0] == date && paymentCache[ii][1] == phone)
					return paymentCache[ii];
		},
		
		addRecord : function (record, callback) {
			var masterSheet = cache.cacheService.getMasterSheet();
			sheet.appendRow(masterSheet, 'Payment', record, function() {
				console.log('Payment Entry is added in Payment sheet');
				paymentCache.push(record);
				callback();
			});
		},
		
		updateRecord : function(record) {
			for(var ii = 0; ii < paymentCache.length; ii++)
				if(paymentCache[ii][0] == record[0] && paymentCache[ii][1] == record[1]) {
					paymentCache[ii] = record;
					return;
				}
		},
		
		initialize : function() {
			console.log('Initializing payment cache');

			var masterSheet = cache.cacheService.getMasterSheet();
			sheet.getRows(masterSheet, 'Payment', function(rows) {
				if (rows != null && rows != undefined) {
					paymentCache = rows;
					console.log('Number of payment records cached: ' + paymentCache.length);
				}
			});
		},

		clear : function() {
			paymentCache = [];
		}		
	};
};

exports.cacheService = new payment();