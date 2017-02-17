'use strict';

var fs = require('fs');
var moment = require('moment');
var cache = require('./models/cache');
var mailer = require('./routes-mailer');
var calendar = require('./models/calendar');
var APPOINTMENTS_FILE = './public/appointments/appointments.json';

module.exports = function (app) {

	// Get list of appointments from the file
	app.get('/appointments', function(req, res) {
		fs.exists(APPOINTMENTS_FILE, function(exists) {
			if(exists) {
				fs.readFile(APPOINTMENTS_FILE, 'utf8', function(err, data) {
					if (err) {
						console.log('Error in reading Appointment File ' + err);
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

	// Get list of appointments from calendar
	app.get('/patientAppointments', function(req, res) {
		console.log('Fetching the appointments for past and next week');
	
		var lastweek = moment().subtract(2, 'weeks');
		var nextweek = moment().add(2, 'weeks');

		var params = {
			timeMin: moment(lastweek).format("YYYY-MM-DDTHH:mm:ssZ"),
			timeMax: moment(nextweek).format("YYYY-MM-DDTHH:mm:ssZ") 
		};

		calendar.getAppointments(params, function(appointments) {
			console.log('Successfully fetched appointments for 2 weeks');
			var patientAppts = [];
			for (var ii = 0; ii < appointments.length; ii++) {
				var summary = appointments[ii].summary;
				if (summary == null || summary == '')
					continue;
				summary = summary.split('|');
				
				patientAppts.push({
					regId: summary[0],
					name: summary[1],
					date: appointments[ii].start.dateTime,
					startDateTime: moment(appointments[ii].start.dateTime).format('lll'),
					endDateTime: moment(appointments[ii].end.dateTime).format('lll')
				});
			}
			
			function compare (a, b) {
				var diff = moment(a.date).diff(moment(b.date));
				return diff;
			}
			patientAppts.sort(compare);
			//console.log(patientAppts);
			res.json(patientAppts);
		});
	});

	app.post('/appointment', function(req, res) {
		var _this = this;
		var appointment = req.body;
		console.log('New appointment request: ' + JSON.stringify(appointment));
		
		// From Reception:
		if (cache.cacheService.getMasterSheet() != '') {
			calendar.createAppointment(appointment, function(error) {
				if(error) {
					console.log('Error in creating appointment');
				}
				console.log('Appointment is successfully created and synched');
				//res.redirect({});
			});
		}
		
		// From Patient: Mailer
		mailer.sendInvite(appointment, function(error) {
			console.log(error);
			console.log('Appointment is successfully created and synched');
		});
		
		// From Patient: Implement sms.sendInvite (appointment);
		res.json({});
	});
	
	app.delete('/appointment/:appointmentId', function (req, res) {
		var appointmentId = req.params.appointmentId;
		if (appointmentId == null || appointmentId == undefined)
			res.redirect('/');
		console.log('Deleting the appointment: ' + appointmentId);
		
		if (cache.cacheService.getMasterSheet() != '') {
			calendar.deleteAppointment(appointmentId, function(error) {
				if(error) {
					console.log('Error in deleting the appointment');
					res.json({});
					return;
				}
				console.log('Appointment is successfully deleted and synched');
				res.json({});
			});
		}
	});
};
