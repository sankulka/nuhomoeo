'use strict';

var moment = require('moment');
var icalToolkit = require('ical-toolkit');
var sendmail = require('sendmail') ({silent: true});

var mailer = module.exports = {

	sendInvite : function (appointment, callback) {
		
		var summary = appointment.summary.split('|');
		var name = summary[1];
		var phone = summary[2];
		
		console.log('Creating the builder');
		// Create a builder
		var builder = icalToolkit.createIcsFileBuilder();

		builder.spacers = true;
		builder.NEWLINE_CHAR = '\r\n';
		builder.calname = 'NuHomoeo Calendar';
		builder.timezone = 'asia/kolkata';
		builder.tzid = 'asia/kolkata';
		builder.method = 'REQUEST';
		builder.events.push({
			start: moment(appointment.startDateTime).toDate(),
			end: moment(appointment.endDateTime).toDate(),
			transp: 'OPAQUE',
			summary: name + ' (' + phone + ')',
			alarms: [15, 10, 5],
			/*repeating: {
			freq: 'DAILY',
			count: 10,
			interval: 10,
			until: new Date()
			},*/
			stamp: new Date(),
			//location: 'Home',
			//description: 'Testing it!',
			organizer: {
				name: 'NuHomoeo',
				email: 'no-reply@nuhomoeo.com',
				sentBy: 'no-reply@nuhomoeo.com'
			},
			attendees: [{
			  name: 'Dr. Swati Kulkarni',
			  email: 'drswatikulkarni@gmail.com'
			}, {
			  name: name,
			  email: appointment.email		
			}]
		});

		console.log('Building the string');
		var icsFileContent = builder.toString()
		if (icsFileContent instanceof Error) {
			console.log('Returned Error, you can also configure to throw errors!');
			callback ("Error");
		}

		console.log('Sending the invite');
		sendmail({
			from: 'no-reply@nuhomeo.com',
			to: 'kulkarni1@avaya.com',
			//to: 'DrSwatiKulkarni@panaceahomoeopathy.in',
			replyTo: 'no-reply@nuhomeo.com',
			subject: 'Appointment for '	+ name + ' (' + phone + ')',
			html: 'Mail of test sendmail ',
			alternatives: [{
				contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
				content: icsFileContent.toString()
			}]
		}, function (error, reply) {
			console.log('Sendmail finished');
			if (error) {
				console.log('Error occurred during send');
				console.log (error && error.stack);
				callback (error);
			}
			callback (reply);
		});
	}
}