var pms = angular.module('PMS');

pms.service('PMSUtilsService', function() {
	this.changes = [
		{name: 'Better', icon: 'fa fa-thumbs-o-up'},
		{name: 'Worse', icon: 'fa fa-thumbs-o-down'},
		{name: 'No Change', icon: 'fa fa-minus'},
		{name: 'Increase', icon: 'fa fa-chevron-up'},
		{name: 'Decrease', icon: 'fa fa-chevron-down'},
		{name: 'High', icon: 'fa fa-arrow-up'},
		{name: 'Low', icon: 'fa fa-arrow-down'},
		{name: 'Ameliorate', icon: 'fa fa-chevron-left'},
		{name: 'Aggravate', icon: 'fa fa-chevron-right'},
		{name: 'Erratic', icon: 'fa fa-bolt'},
		{name: 'Present', icon: 'fa fa-circle'},
		{name: 'Absent', icon: 'fa fa-ban'}
	];
	
	this.getChanges = function () {
		return this.changes;
	}
	
	this.getIconByName = function (name) {
		for (var ii = 0; ii < this.changes.length; ii++) {
			if (name == this.changes[ii].name)
				return this.changes[ii].icon;
		}
	}

	this.payMediums = ['Bank', 'Cash', 'Card', 'E-Wallet', 'Other'];
	/*	{name: 'Bank', icon: ''},
		{name: 'Cash', icon: 'fa fa-rupee'},
		{name: 'Card', icon: 'fa fa-credit-card'},
		{name: 'E-Wallet', icon: ''},
		{name: 'Other', icon: ''}
	*/

	this.getPayMediums = function () {
		return this.payMediums;
	}
	
	this.apptQueries = [
		'Yesterday',
		'Today',
		'Tomorrow',
		'Last Week',
		'This Week',
		'Next Week'
	];
	
	this.getApptQueries = function () {
		return this.apptQueries;
	}

	this.medicines = [
		'Arnica',
		'Belladona',
		'Kali Phos'
	];
	
	this.getMedicines = function () {
		return this.medicines;
	}
});