var controller = angular.module('testimonials-controller', [
	'ui.bootstrap'
]);

controller.controller('testimonials-controller', ['$http', '$scope', '$window', '$state',
	function TestimonialsController($http, $scope, $window, $state) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		$scope.vm = this;
		var _this = this;
		
		$scope.vm.isLoggedIn = JSON.parse($window.sessionStorage.getItem('isLoggedIn'));
		this.$http.get('/testimonials').success(function(testimonials) {
			console.log('Successful testimonials request');
			$scope.vm.testimonials = testimonials;
			console.log(testimonials);
		});
		
		$scope.deleteTestimonial = function (testimonial) {
			if (testimonial.date == null || testimonial.date == undefined)
				return;
			
			_this.$http.delete('/testimonial/' + testimonial.date).success(function() {
				console.log('Testimonial deleted successfully');
				_this.$state.reload();
			});
		}
	}
]);