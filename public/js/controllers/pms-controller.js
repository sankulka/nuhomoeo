angular.module('PMS')

.controller('PMSController', ['$rootScope', '$scope', '$window', '$http', '$state', 'Idle',
	function PMSController($rootScope, $scope, $window, $http, $state, Idle) {
		this.$scope = $scope;
		this.$http = $http;
		this.window = $window;
		$scope.vm = this;
		this.Idle = Idle;
		this.query = '';
		var _this = this;
		
		$scope.vm.isLoggedIn = false;
		$window.sessionStorage.setItem('isLoggedIn', false);
		
		$scope.pmsDashboard = function() {
			console.log('Launching PMS dashboard');
			$state.go('dashboard');
		};

		$scope.chronicDashboard = function() {
			console.log('Launching Chronic Patients dashboard');
			$state.go('patients');
		};

		$scope.acuteDashboard = function() {
			console.log('Launching Acute Patients dashboard');
			$state.go('acute');
		};
		
		$scope.prescriptionsDashboard = function() {
			console.log('Launching Prescriptions dashboard');
			$state.go('prescriptions');
		};
		
		$scope.paymentsDashboard = function() {
			console.log('Launching Payments dashboard');
			$state.go('payments');
		};
		
		$scope.testimonials = function() {
			console.log('Launching Testimonials');
			$state.go('testimonials');
		}

		$scope.gallery = function() {
			console.log('Launching Gallery');
			$state.go('gallery');
		}		
		
		$scope.calendar = function() {
			console.log('Launching Calendar');
			$state.go('calendar');
		}
		
		$scope.search = function() {
			console.log('Searching Patients: ' + _this.query);
			var query = _this.query;
			_this.query = '';
			$state.go('patients', {'query': query});
		}
		
		$scope.logout = function() {
			console.log('Logging out');
			$scope.vm.isLoggedIn = false;
			$window.sessionStorage.setItem('isLoggedIn', false);
			$window.sessionStorage.removeItem('isLoggedIn');
			$window.sessionStorage.clear();
			
			_this.$http.get('/logout').success(function(){
				console.log('Logged out from server.');
				_this.window.open("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:8005/", "_self");
			});
		}
		
		// This is idle timeout 
		$scope.idle = 120*60; // 2 hours of idle time
        $scope.timeout = 1;
        $scope.$on('IdleStart', function() {
			console.log('Idle time started');
        });
        $scope.$on('IdleEnd', function() {
			console.log('Idle time ended');
        });

        $scope.$on('IdleTimeout', function() {
			console.log('Timeout. Logging out');
			$scope.logout();
        });

        $scope.$watch('idle', function(value) {
          if (value !== null) _this.Idle.setIdle(value);
        });
        $scope.$watch('timeout', function(value) {
          if (value !== null) _this.Idle.setTimeout(value);
        });
	}
])

.config(function(IdleProvider, KeepaliveProvider) {
	KeepaliveProvider.interval (30);
	IdleProvider.windowInterrupt ('focus');
})

.run(function(Idle, Keepalive){
	Idle.watch();
});