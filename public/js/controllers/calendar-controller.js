var controller = angular.module('calendar-controller', [
'appointment-controller'
]);

controller.controller('calendar-controller', ['$rootScope', '$http', '$scope', '$window', '$state', '$uibModal',
	function CalendarController($rootScope, $http, $scope, $window, $state, $uibModal) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		this.$uibModal = $uibModal;
		$scope.vm = this;
		var _this = this;

		$scope.vm.isLoggedIn = JSON.parse($window.sessionStorage.getItem('isLoggedIn'));
		
		this.$http.get('/appointments').success(function (appointments) {
			$scope.vm.appointments = appointments;
			console.log(appointments);
			console.log('Appointments are successfully fetched for calendar');
		});
		
		/*
		startDateTime:
		endDateTime:
		summary: id | name | phone
		email:
		*/
		
		$scope.addAppointment = function (dateTime) {
			console.log('Adding new appointment');
			
			var selected = moment(dateTime);
			var next3months = moment().add(3, 'months');
			if (selected > next3months) {
				//alert('Select a date within 3 months');
				console.log('Selected date is beyond 3 months');
				return;
				/*
				var modalInstance = _this.$uibModal.open({
					templateUrl: 'reselectAppointment.html',
					//controller: 'appointment-controller',
					//scope: $scope,
					appendTo: angular.element(document.querySelector('#calendar-controller'))
				});

				modalInstance.result.then(function () {

				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
				return;
				*/
			}
			
			$scope.vm.dateTime = dateTime;
			var modalInstance = _this.$uibModal.open({
				templateUrl: 'appointment.html',
				controller: 'appointment-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#calendar-controller')),
				resolve: {
					event: null,
					dateTime: dateTime,
					isLoggedIn: _this.isLoggedIn
				}
			});

			modalInstance.result.then(function (appointment) {
				console.log(appointment);

				_this.$http.post('/appointment/', angular.toJson(appointment)).success(function() {
					console.log('Appointment is successfully requested');
					_this.$state.reload();

				}, function () {
				console.log('Modal dismissed at: ' + new Date());
				_this.$state.reload();
				});
			});
		}
		
		$scope.eventClick = function (event) {
			_this.event = event;

			var modalInstance = _this.$uibModal.open({
				templateUrl: 'appointment.html',
				controller: 'appointment-controller',
				scope: $scope,
				appendTo: angular.element(document.querySelector('#calendar-controller')),
				resolve: {
					event: _this.event,
					dateTime: null,
					isLoggedIn: _this.isLoggedIn
				}
			});

			modalInstance.result.then(function (event) {

				if (event.delete) {
					_this.$http.delete('/appointment/' + event.id).success(function() {
						console.log('Appointment is successfully deleted');
						_this.$state.reload();
					});
				} else if (event.sms) {
					_this.$http.post('/sms/' + event.id).success(function() {
						console.log('SMS is successfully sent');
						_this.$state.reload();
					});
				}
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
				_this.$state.reload();
			});		
		}
	}
]);