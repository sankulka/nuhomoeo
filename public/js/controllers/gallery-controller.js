var controller = angular.module('gallery-controller', [
	'ui.bootstrap',
	'ngFileUpload'
]);

controller.controller('gallery-controller', ['$rootScope', '$http', '$scope', '$window', '$state', 'Upload',
	function galleryController($rootScope, $http, $scope, $window, $state, Upload) {
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		$scope.vm = this;
		var _this = this;
		
		$scope.vm.isLoggedIn = JSON.parse($window.sessionStorage.getItem('isLoggedIn'));
		this.$http.get('/gallery').success(function(gallery) {
			console.log('Successful gallery request');
			$scope.vm.gallery = gallery;
		});

		$scope.deleteGalleryFile = function (file) {
			if (file == null || file == undefined)
				return;
			
			_this.$http.delete('/gallery/' + file).success(function(error) {
				console.log('gallery file deleted successfully');
				_this.$state.reload();
			});
		}
		
		$scope.uploadFiles = function(file, errFiles) {
			if (file) {
				file.upload = Upload.upload({
					url: '/gallery/',
					data: {file: file}
				});
				
				file.upload.then (function (response) {
					console.log('Upload is successful. Launching gallery');
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
]);