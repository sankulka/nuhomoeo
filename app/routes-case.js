'use strict';

var auth = require('../config/auth');

module.exports = function (app) {

	// Get all of un-read emails
	app.get('/case/:patientId', function(req, res) {
		var patientId = req.params.patientId;
		console.log('getting form url for the patient: ' + patientId);

		/*https://docs.google.com/forms/d/e/1FAIpQLSeWMndL-zOsxJE3wgq_ZQQVi4xufTsp0wplm0QYrJfsJApnlw/viewform?entry.818258525=SNKKKK-12
		*/
		
		var url = 'https://docs.google.com/forms/d/e/' + auth.casePaperId +
			'/viewform?entry.' + auth.registrationIdInCasePaper + '=' + patientId;
		res.json(url);
		
		/* Change to patient forlder later to store the pdf file
		script.getCasePaperUrl(patientId, function(url) {
			console.log('** Case history url for the patient: ' + url);
			res.json(url);
		});
		*/
	});
};