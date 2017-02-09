var pms = angular.module('PMS');

pms.service('PMSRolesService', function() {
	this.isLoggedIn = false;
	this.role = '';
	
	this.setLoggedIn = function (loggedIn) {
		console.log('setting Loggin status: ' + loggedIn);
		this.isLoggedIn = loggedIn;
	}
	
	this.getLoggedIn = function () {
		return this.isLoggedIn;
	}

	this.setRole = function (role) {
		this.role = role;
	}
	
	this.getRole = function () {
		return this.role;
	}
});