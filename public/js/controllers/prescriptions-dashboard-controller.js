var controller = angular.module('prescriptions-dashboard-controller', [
	'ui.bootstrap'
]);

controller.controller('prescriptions-dashboard-controller', ['$http', '$scope', '$window', '$state', '$filter', '$stateParams', '$uibModal', 'PMSUtilsService',
	function PrescriptionsDashboardController($http, $scope, $window, $state, $filter, $stateParams, $uibModal, PMSUtilsService) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		$scope.vm = this;
		var _this = this;
		this.query = ''
		
		if ($stateParams.query != '')
			_this.query = $stateParams.query;
		else
			_this.query = '';
		console.log('Prescription query: ' + $stateParams.query);

		this.search = function(prescription) {
			var query = _this.query ? _this.query.toLowerCase() : '';
			if (query == '')
				return true;
			var name = prescription.name ? prescription.name.toLowerCase() : '';
				
			if (name != '' && name.indexOf(query) >= 0)
				return true;
			return false;
		}		
		
		this.$http.get('/prescriptions').success(function(prescriptions) {
			console.log('Successful prescriptions request');
			$scope.vm.prescriptions = prescriptions;
			console.log(prescriptions);
		});
		
		this.itemsPerPage = 10;
		this.maxSize = 5; //Number of pager buttons to show

		this.currentPatientPage = 1;
		this.setPatientPage = function (pageNo) {
			$scope.vm.currentPatientPage = pageNo;
		};
		this.patientPageChanged = function() {
			console.log('Patient page changed to: ' + $scope.vm.currentPatientPage);
		};
	}
]);