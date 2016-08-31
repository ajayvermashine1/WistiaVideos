
;(function () {
		'use strict';
		
        var url 				= 'https://upload.wistia.com/';
        var api_password		= '553d15dcd180c8f916de4ac13a4f3fb3ebc8a4ebb09c23d79a261a98e72b79dc';

    angular.module('demo', [
        'blueimp.fileupload'
    ])
	.config([
		'$httpProvider', 'fileUploadProvider',
		function ($httpProvider, fileUploadProvider) {
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
			fileUploadProvider.defaults.redirect = window.location.href.replace(
				/\/[^\/]*$/,
				'/cors/result.html?%s'
			);
			angular.extend(fileUploadProvider.defaults, {
				disableImageResize: /Android(?!.*Chrome)|Opera/
					.test(window.navigator.userAgent),
			});
		}
	])
	.controller('DemoFileUploadController', [
		'$scope', '$http', '$sce', '$filter', '$window',
		function ($scope, $http, $sce) {
			$scope.videoURL = '';
			$scope.urlSafe 		= function(src) {
				return $sce.trustAsResourceUrl(src);
			}
			$scope.showEmbed = false;
			$scope.options = {
				url: url,
				formData:{api_password:api_password},
			}; 
			$scope.$on('fileuploaddone', function(e, data){
				$scope.videoURL = '//fast.wistia.net/embed/iframe/' + data.result.hashed_id + '?videoFoam=true';
				$scope.showEmbed = true;

		   });  
		}
	]);

}());
