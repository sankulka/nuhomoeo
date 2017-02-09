'use strict';

var fs = require('fs');
var cache = require('./models/cache');
var formidable = require('formidable');
var moment = require('moment');
var GALLERY_PATH = './public/gallery/';

module.exports = function (app) {

	// Get list of activities for the given patient
	app.get('/gallery', function(req, res) {
		fs.readdir(GALLERY_PATH, function(error, list) {
			if(error) {
				console.log('Error in getting gallery files: ' + error);
			} else {
				if (list == null || list == undefined || list == "")
					res.redirect('/');
				else {
					var files = [];
					for (var ii = 0; ii < list.length; ii++)
						files.push(list[ii]);
					res.json(files);
				}
			}
		});
	});
	
	app.delete('/gallery/:file', function(req, res) {
		var file = req.params.file;
		if (file == null)
			res.redirect('/');
		
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.redirect('/');
		}
		
		console.log('Deleting the Gallery file: ' + GALLERY_PATH + file);
		fs.unlink (GALLERY_PATH + file, function(error) {
			if (error)
				console.log('Error in deleting the file');
			else
				console.log('Successfully deleted the file: ' + file);
			res.json({});
		});
	});

	// Create the Testimonial for a given patient
	app.post('/gallery/', function(req, res) {
		var masterSheet = cache.cacheService.getMasterSheet();
		if(masterSheet == undefined || masterSheet == "") {
			console.log('Cache is not yet initialized.');
			res.redirect('/');
		}
		
		// create an incoming form object
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			console.log('Uploading File to Gallery: ' + files.file.name);
		
			fs.readFile(files.file.path, function(err, data) {
				fs.writeFile(GALLERY_PATH + files.file.name, data, 'binary', function (err) {
					if (err)
						console.log("Error in uploading file in gallery")
					else
						console.log("File is successfully uploaded in gallery")
					res.json({});
				});
			});
		});
	});
};