'use strict';

var fs = require('fs');
var moment = require('moment');
var auth = require('../../config/auth');
var googleapis = require('googleapis');
var calendarService = googleapis.calendar('v3');
var APPOINTMENTS_FILE = './public/appointments/appointments.json';

var calendar = module.exports = {

	synchAppointments : function (callback) {
		console.log('Fetching the appointments for past 2 and next 2 month');
	
		var now = moment();
		var last2months = moment().subtract(2, 'months');
		var next2months = moment().add(2, 'months');

		var params = {
			timeMin: moment(last2months).format("YYYY-MM-DDTHH:mm:ssZ"),
			timeMax: moment(next2months).format("YYYY-MM-DDTHH:mm:ssZ") 
		};

		this.getAppointments(params, function(appointments) {
			fs.writeFile(APPOINTMENTS_FILE,
				JSON.stringify(appointments), 'utf8');
			callback();
			console.log('Appointments are successfully fetched');
		});
	},
	
	getAppointments : function(inParams, callback) {
		var reqParams = {
			auth: auth.googleClient,
			calendarId: 'primary',
			fields: 'items(attendees(displayName, email),description,end/dateTime,id,start/dateTime,summary)'
		};
		
		var params = Object.assign({}, reqParams, inParams);				
		calendarService.events.list(params, {}, function(err, response) {
			if (err) {
				console.log('The API returned an error: ' + err);
				return;
			}
			//console.log(response.items);
			callback(response.items);
		});
	},
	
	createAppointment: function(appointment, callback) {
		var event = {
			'summary': appointment.summary,
			'start': {
				'dateTime': appointment.startDateTime
			},
			'end': {
				'dateTime': appointment.endDateTime
			}
		};
		
		if (appointment.email != '') {
			event.attendees = [
				{'email': appointment.email}
			];			
		}
		
		var params = {
			auth: auth.googleClient,
			calendarId: 'primary',
			resource: event
		};
		var _this = this;
		calendarService.events.insert(params, {}, function(error, event) {
			if (error) {
				console.log('Calender event insert API returned an error: ' + error);
				callback(error);
				return;
			}
			_this.synchAppointments (function () {
				console.log('Event is successfully created and synched ' + event);
				callback();
				return;
			});
		});
	},
	
	deleteAppointment: function(id, callback) {
		
		var params = {
			auth: auth.googleClient,
			calendarId: 'primary',
			eventId: id
		};
		var _this = this;
		calendarService.events.delete(params, {}, function(error) {
			if (error) {
				console.log('Calender event insert API returned an error: ' + error);
				callback(error);
				return;
			}
			_this.synchAppointments (function () {
				console.log('Event is successfully created and synched ');
				callback();
				return;
			});
		});
	}
};