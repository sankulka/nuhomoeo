var controller = angular.module('patient-dashboard-controller', [
	'ui.bootstrap',
	'ngFileUpload',
	'patient-update-controller',
	'patient-followup-controller',
	'notes-controller'
]);

controller.controller('patient-dashboard-controller', ['$http', '$scope', '$window', '$state', '$stateParams', 'Upload', '$filter', '$uibModal', 'PatientCreateService', 'PMSUtilsService',
	function PatientDashboardController($http, $scope, $window, $state, $stateParams, Upload, $filter, $uibModal, PatientCreateService, PMSUtilsService){
		this.$http = $http;
		this.scope = $scope;
		this.window = $window;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		$scope.vm = this;
		this.disableTestimonial = true;
		var _this = this;

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
	*/	

		//Launching current patient dashboard
		_this.currentId = $stateParams.patientId;
		if(_this.currentId) {
			$scope.vm.currentId = _this.currentId;
			this.$http.get('/patients/' + _this.currentId).success(function(patient) {
				console.log('Successful single patient request');
				_this.currentPatient = patient;

				console.log(patient);
				$scope.vm.id = patient.id;
				$scope.vm.salutation = patient.salutation;
				$scope.vm.name = patient.name;
				$scope.vm.gender = patient.gender;
				$scope.vm.reference = patient.reference;
				$scope.vm.phone = patient.phone;
				$scope.vm.email = patient.email;
				
				if (patient.dob != null)
					$scope.vm.dob = moment(patient.dob).format("ll");
				else
					$scope.vm.dob = '';
				
				$scope.vm.primaryCom = patient.complaints.primaryCom;
				$scope.vm.secondaryCom = patient.complaints.secondaryCom;				
				$scope.vm.address = patient.address + ' sdvsds';
			});
			
			this.$http.get('/files/' + _this.currentId).success(function(filesFolder) {
				console.log('Successful reading of patient\'s folder: ' + filesFolder);
				$scope.vm.filesFolder = "https://drive.google.com/embeddedfolderview?id=" + filesFolder + "#grid";
			});

			this.$http.get('/activities/' + _this.currentId).success(function(activities) {
				console.log('Successful reading of patient activities');
					
				$scope.vm.activities = activities;
				console.log(activities);
			});
		}
		
		// Testimonial selection
		$scope.selectActivity = function (activity) {
			if (activity[1] == 'Email' || 
				activity[1] == 'Followup' ||
				activity[1] == 'CaseHistory') {
					console.log('Rejecting the selection');
					$scope.clearAllSelections();
					return;
				}
			activity.selected ? activity.selected = false : activity.selected = true;
			$scope.enableDisableTestimonial();
		}
		
		// Testimonial Enablement
		$scope.enableDisableTestimonial = function () {
			for(var ii = 0; ii < $scope.vm.activities.length; ii++) {
				var activity = $scope.vm.activities[ii];
				if (activity.selected == true) {
					_this.disableTestimonial = false;
					return;
				}
			}
			_this.disableTestimonial = true;
		}
		
		$scope.clearAllSelections = function () {
			for(var ii = 0; ii < $scope.vm.activities.length; ii++)
				$scope.vm.activities[ii].selected = false;
			_this.disableTestimonial = true;			
		}
		
		// Testimonial Creation
		$scope.createTestimonial = function () {
			var activities = [];
			for(var ii = 0; ii < $scope.vm.activities.length; ii++) {
				var activity = $scope.vm.activities[ii];
				if (activity.selected == true) {
					activities.push(activity);
				}
			}
			
			if (activities.length > 0) {
				_this.$http.post('/testimonials/' + _this.currentId,
					angular.toJson(activities)).success(function() {
					console.log('Testimonial is successfully created');
					_this.$state.reload();
				});
			}
			console.log('Request is recieved. Please check the Testimonials after few minutes.');
			$scope.clearAllSelections();
		}
		
		// Patient creation
		$scope.createPatient = function () {
			console.log('Creating patient');
			var element = angular.element(document.querySelector('#patient-dashboard-controller'));
			PatientCreateService.createPatient(_this.$scope, _this.$state, element);		
		}
		
		// Patient updation
		$scope.updatePatient = function (notification) {
			console.log('Updating patient');

			$scope.selectedNotification = notification;
			var modalInstance = _this.$uibModal.open({
				templateUrl: 'patientUpdate.html',
				controller: 'patient-update-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#patient-dashboard-controller')),
				resolve: {
					PMSUtilsService: PMSUtilsService,
					patient: function () {
						var complaints = {
							'primaryCom': $scope.vm.primaryCom,
							'secondaryCom': $scope.vm.secondaryCom
						};
						return patient = {
							salutation: $scope.vm.salutation,
							name: $scope.vm.name,
							phone: $scope.vm.phone,
							reference: $scope.vm.reference,
							email: $scope.vm.email,
							gender: $scope.vm.gender,
							//dob: moment(_this.currentPatient.dob),
							birthdate: moment(_this.currentPatient.dob),
							complaints: complaints,
							address: $scope.vm.address							
						};
					}
				}
			});
			
			modalInstance.result.then(function (patient) {
				patient['id'] = _this.currentId;
				console.log(patient);

				_this.$http.post('/patients/', angular.toJson(patient)).success(function(newId, stat) {
					console.log('Patient is successfully updated: ' + newId);
					_this.$state.reload();
				});
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}
		
		$scope.addNotes = function (notification) {
			console.log('Adding new notes');

			$scope.selectedNotification = notification;
			var modalInstance = _this.$uibModal.open({
				templateUrl: 'notes.html',
				controller: 'notes-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#patient-dashboard-controller')),
				resolve: {
					notes: null
				}
			});

			modalInstance.result.then(function (noteInput) {
				console.log(noteInput);
				
				var test = {
					note: noteInput
				};

				_this.$http.post('/notes/' + _this.currentId, angular.toJson(test))
				.success(function() {
					console.log('Notes is successfully added');
					_this.$state.reload();
				});
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}

		$scope.startCaseHistory = function() {
			var id = _this.$stateParams.patientId;
			console.log('Getting case paper url');

			_this.$http.get('/case/' + _this.currentId).success(function(url) {
				_this.window.open(url, '_blank'); // in new tab
				//$location.path(url); // in same tab
				_this.$state.reload();
			});
			_this.$state.reload();
		}
		
		$scope.addFollowup = function(notification) {
			var id = _this.$stateParams.patientId;
			
			console.log('Adding new followup');
			$scope.selectedNotification = notification;
			var modalInstance = _this.$uibModal.open({
				templateUrl: 'followup.html',
				controller: 'patient-followup-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#patient-dashboard-controller')),
				//appendTo: angular.element(document).find('xyz'),
				size: '' // blank, sm, lg
			});
			
			modalInstance.result.then(function (activity) {
				console.log(activity);
				_this.$http.post('/followup/' + _this.currentId, angular.toJson(activity))
				.success(function() {
					console.log('Followup is successfully added');
					_this.$state.reload();
				});
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
				_this.$state.reload();
			});
		}

		$scope.uploadFiles = function(file, errFiles) {
			if (file) {
				file.upload = Upload.upload({
					url: '/files/' + _this.currentId,
					data: {file: file}
				});
				
				file.upload.then (function (response) {
					console.log('Upload is successful. Launching Patient dashboard');
					_this.$state.reload();
				}, function (response) {
					if (response.status > 0)
						console.log('Error in uploading file: ' +
							response.status + ': ' + response.data);
				}, function (evt) {
					file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
					console.log('Upload progress: ' + file.progress);
				});
			}
		}	
	}
])

.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);