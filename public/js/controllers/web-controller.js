angular.module('WEB')

.controller('WEBController', ['$rootScope', '$scope', '$window', '$http', '$state', 'Idle',
	function WEBController($rootScope, $scope, $window, $http, $state, Idle) {
		this.$scope = $scope;
		this.$http = $http;
		this.window = $window;
		$scope.vm = this;
		this.Idle = Idle;
		this.query = '';
		var _this = this;
		
		$window.sessionStorage.setItem('isLoggedIn', false);
		$scope.vm.isLoggedIn = false;

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

.run(function($rootScope, Idle, $log, Keepalive){
	Idle.watch();
});