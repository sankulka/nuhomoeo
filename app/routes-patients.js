'use strict';

var async = require('async');
var moment = require('moment');
var auth = require('../config/auth');
var cache = require('./models/cache');
var googleapis = require('googleapis');
var drive = require('./models/drive');
var sheet = require('./models/sheet');
var driveService = googleapis.drive({ version: 'v3', auth: auth.googleClient });

module.exports = function (app) {

	/*
	0	A RegID
	1	B Salutation
	2 	C Name
	3 	D Gender
	4	E Reference
	5 	F PhoneNumber
	6 	G Email
	7 	H DOB
	8 	I Complaints
	9 	J Address
	10 	K Date
	11	L FolderId
	12  M DetailsId
	13	N FilesId
	*/	
	
	function getPatientFromRow(row) {
		var patient = {
			id: row[0],
			salutation: row[1],
			name: row[2],
			gender: row[3],
			reference: row[4],
			phone: row[5],
			email: row[6],
			dob: row[7],
			complaints: JSON.parse(row[8]),
			address: row[9]
		}
		return patient;
	}
	
	function getRowFromPatient(patient) {
		var row = [];
		row.push(patient.id);
		row.push(patient.salutation);
		row.push(patient.name);
		row.push(patient.gender);
		row.push(patient.reference);
		row.push(patient.phone);
		row.push(patient.email);
		row.push(patient.dob);
		row.push(JSON.stringify(patient.complaints));
		row.push(patient.address);
		return row;
	}
	// Get personal information for all patients
	app.get('/patients', function(req, res) {
		console.log('Getting the list of all patients');
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.json({});
		} 
		else {		
			var rows = [];
			var patients = cache.cacheService.getPatientsCache();
			for (var ii = 0; ii < patients.length; ii++) {
				var entry = {
					'regId' : patients[ii][0],
					'name' : patients[ii][2],
					'reference' : patients[ii][4],
					'phone' : patients[ii][5],
					'email': patients[ii][6],
					'complaints' : JSON.parse(patients[ii][8]),
					'date' : patients[ii][10]
				};
				rows.push(entry);
			}
			res.json(rows);
		}
	});
	
	// Get details of the given patient
	app.get('/patients/:patientId', function (req, res) {
		var patientId = req.params.patientId;
		console.log('Getting details of the patient: ' + patientId);
		var patients = cache.cacheService.getPatientsCache();
		var patient = [];
		for (var ii = 0; ii < patients.length; ii++)
			if (patients[ii][0] == patientId) {
				patient = getPatientFromRow(patients[ii]);
				break;
			}
		res.json(patient);
	});

	// Create new patient or Update existing one
	app.post('/patients', function(req, res) {
		var patient = req.body;
		var currentId = patient.id;
		if(currentId != undefined && currentId != '') {
			// Updating existing Patient
			var masterSheet = cache.cacheService.getMasterSheet();
			if(masterSheet == undefined || masterSheet == "") {
				console.log('Cache is not yet initialized.');
				res.redirect('/');
			}
			
			var currentPatient = getRowFromPatient(patient);
			var row = parseInt(currentId.split('-')[1]);
			if (row == undefined || row == NaN)
				res.redirect('/');

			var range = 'PatientMasterSheet!A' + (row+1) + ':J' + (row+1);
			sheet.updateRow(masterSheet, range, currentPatient, function() {
				console.log('Sheet is updated. Updating the cache now');
				var cachePatient = cache.cacheService.getPatientById(currentId);
				for (var ii = 0; ii < 11; ii++)
					cachePatient[ii] = currentPatient[ii];
				cache.cacheService.updatePatient(cachePatient);
				res.json(currentId);
			});
		} else {
			//Creating new Patient
			var newId = cache.cacheService.getNewPatientId();
			var folderName = newId; //auth.initial + '-' + _this.newId;
			var patientsFolder = cache.cacheService.getPatientsFolder();
			if(patientsFolder == undefined || patientsFolder == "") {
				console.log('Cache is not yet initialized.');
				res.json({});
			}

			console.log('Creating: ' + folderName + ' in ' + patientsFolder);
			var metaData = {
				'name': folderName,
				'parents': [patientsFolder],
				'mimeType': 'application/vnd.google-apps.folder'
			};
			driveService.files.create({
				resource: metaData,
				fields: 'id'
			}, function(err, folder) {
			
				console.log('New FolderID: ' + folder.id);
				var masterSheet = cache.cacheService.getMasterSheet();
				var detailsTemplate = cache.cacheService.getDetailsTemplate();
				var newDetails = folderName + '-Details';
				var newDetailsId = '';
				var filesId = '';
				
				function setNewDetailsId(id) {
					newDetailsId = id;
				}
				
				var filesMetaData = {
					'name': 'files',
					'parents': [folder.id],
					'mimeType': 'application/vnd.google-apps.folder'
				};
				
				function setFilesId(id) {
					filesId = id;
				}
						
				function updateMasterSheetFile() {
					patient['id'] = newId;
					var rowEntry = getRowFromPatient(patient);
					rowEntry.push(new moment().format('YYYY-MM-DDTHH:mm:ssZ'));
					rowEntry.push(folder.id)
					rowEntry.push(newDetailsId);
					rowEntry.push(filesId);
					sheet.appendRow(masterSheet, 'PatientMasterSheet', rowEntry, function() {
						console.log('Master Sheet is updated. Updating the cache now');
						cache.cacheService.addNewPatient(rowEntry);
						res.json(newId);
					});
				}
							
				var templates = [
					[newDetails, detailsTemplate, setNewDetailsId],
					[null, null, setFilesId]
				];
				async.each(templates, function(template, callback) {
					if (template[0] == null) { //Creating files folder
						driveService.files.create({
							resource: filesMetaData,
							fields: 'id'}, function(err, filesFolder) {
							template[2](filesFolder.id);
							callback();
						});
					} else { //Copying Details Template
						drive.copyFile(template[1], template[0], folder.id, function(newId) {
						console.log(template[0] + ' : '	+ newId);
							template[2](newId);
							callback();
						});
					}
				}, function (error) {
					updateMasterSheetFile();
				});
			});
		}
	});
};

/*
Real example to perform multiple similar tasks one after another and then final callabck
				function setCaseId(id) {
					newCaseId = id;
				}
				function setNewDetailsId(id) {
					newDetailsId = id;
				}
				var templates = [
					[newDetails, detailsTemplate, setNewDetailsId]
					[newCase, caseTemplate, setCaseId]
				];
				async.each(templates, function(template, callback) {
					drive.copyFile(template[1], template[0], folder.id, function(newId) {
					console.log(template[0] + ' : '	+ newId);
						template[2](newId);
						callback();
					});
				}, function (error) {
					updateMasterSheetFile();
				});
*/