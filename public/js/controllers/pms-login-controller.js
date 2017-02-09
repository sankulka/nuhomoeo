var controller = angular.module('pms-login-controller', []);

controller.controller('pms-login-controller', ['$scope', '$state', '$cookies',
    function PMSLoginController($scope, $state, $cookies) {
		console.log('I am in login');
    }
])