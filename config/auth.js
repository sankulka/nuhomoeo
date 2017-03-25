'use strict';

var googleapis = require('googleapis');
var exports = module.exports = 	{
	'scopes' : 'https://spreadsheets.google.com/feeds ' +
				'https://www.googleapis.com/auth/drive ' +
				'https://www.googleapis.com/auth/drive.file ' +
				'https://www.googleapis.com/auth/drive.appdata ' +
				'https://www.googleapis.com/auth/forms ' +
				'https://www.googleapis.com/auth/calendar ' +
				'https://mail.google.com/ ' +
				'https://www.googleapis.com/auth/gmail.modify ' +
				'https://www.googleapis.com/auth/gmail.readonly ' +
				'https://www.googleapis.com/auth/gmail.labels ' +
				'https://www.googleapis.com/auth/script.send_mail ' +
				'https://www.googleapis.com/auth/documents '
};

var client_id = '1077116939953-cbrkk3fd5o7obr27f644r5qgtgngqssb.apps.googleusercontent.com';
var client_secret = 'OaVTvYj3ETSKzdas4bDX-gs_';
var redirect_uris = 'http://nuhomoeo-node-nuhomoeo.44fs.preview.openshiftapps.com/oauth2callback';

exports.initial = 'SNKK';
exports.casePaperId = '1FAIpQLSeWMndL-zOsxJE3wgq_ZQQVi4xufTsp0wplm0QYrJfsJApnlw';
exports.registrationIdInCasePaper = '818258525';

exports.googleClient = new googleapis.auth.OAuth2(client_id, client_secret, redirect_uris);
exports.emailScriptId = '17krJ7dzxDiy8Aa-9fZMW71tjnDM8w1zxovNUbyr6PsbNUJv9jPYJb8LM'; //email
exports.caseScriptId = '1lixTUer6XjCtSH2PMlZbQoZODnvQiL-Qi0rE5ohXkfF7pxNdzHhE4m1i'; //casepaper
