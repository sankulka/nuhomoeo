'use strict';

var cache = require('./cache');
var sheet = require('./sheet');

/*
0	A Date
1	B Phone
2 	C Name
3	D Notes
4 	E Followup
*/

var acute = function () {
	var acuteCache = [];

	return {
		getAcuteCache : function() {
			return acuteCache;
		},
		
		setAcuteCache : function(patients) {
			acuteCache = patients;
		},

		getRecordByDatePhone : function(date, phone) {
			for(var ii = 0; ii < acuteCache.length; ii++)
				if(acuteCache[ii][0] == date && acuteCache[ii][1] == phone)
					return acuteCache[ii];
		},
		
		addRecord : function (record, callback) {
			var masterSheet = cache.cacheService.getMasterSheet();
			sheet.appendRow(masterSheet, 'Acute', record, function() {
				console.log('Acute Followup added in Acute sheet');
				acuteCache.push(record);
				callback();
			});
		},
		
		updateRecord : function(record) {
			for(var ii = 0; ii < acuteCache.length; ii++)
				if(acuteCache[ii][0] == record[0] && acuteCache[ii][1] == record[1]) {
					acuteCache[ii] = record;
					return;
				}
		},
		
		initialize : function() {
			console.log('Initializing acute cache');

			var masterSheet = cache.cacheService.getMasterSheet();
			sheet.getRows(masterSheet, 'Acute', function(rows) {
				if (rows != null && rows != undefined) {
					acuteCache = rows;
					console.log('Number of acute records cached: ' + acuteCache.length);
				}
			});
		},

		clear : function() {
			acuteCache = [];
		}		
	};
};

exports.cacheService = new acute();