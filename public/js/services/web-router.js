var router = angular.module('web-router', []);

router
    .config(['$urlRouterProvider', '$locationProvider',
        function($urlRouterProvider, $locationProvider) {
//            $urlRouterProvider.otherwise("/login");
			$locationProvider.hashPrefix('!');
        }
	]);

router
    .config(['$stateProvider',
        function($stateProvider) {

            $stateProvider
                .state('login', {
                    url :'/login',
                    views :  {
                        '': {
                            templateUrl: 'partials/about.html',
                            controller: 'pms-login-controller',
                        },
                    },
                })
				
			.state('testimonials', {
                    url :'/testimonials',
                    views :  {
                        '': {
                            templateUrl: 'partials/testimonials.html',
							controller: 'testimonials-controller'
                        },
                    },
                })

			.state('gallery', {
                    url :'/gallery',
                    views :  {
                        '': {
                            templateUrl: 'partials/gallery.html',
							controller: 'gallery-controller'
                        },
                    },
                })
				
			.state('calendar', {
                    url :'/calendar',
                    views :  {
                        '': {
                            templateUrl: 'partials/calendar.html',
							controller: 'calendar-controller'
                        },
                    },
                })
		}
	]);