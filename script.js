var myApp = /**
* loginApp Module
*
* Description
*/
angular.module('loginApp', [])

.factory('facebookService', function($q) {
	return {
		getMyLastName: function() {
			var deferred = $q.defer();
			FB.api('/me', {
				fields: 'name'
			}, function(response) {
				if (!response || response.error) {
					deferred.reject('Error occured');
				} else {
					deferred.resolve(response);
				}
			});
			return deferred.promise;
		},
		share:function(){
			FB.ui({
				method: 'feed',
				caption: 'Best Desgin Ever',
				link: 'https://sukanyagraphics.comli.com/',
			}, function(response){});
		}
		
	}
})

.controller('loginCon', function($scope,facebookService){

	$scope.login = false;
	$scope.getDetails = function() {
		facebookService.getMyLastName() 
		.then(function(response) {
			$scope.data = response;
			console.log(response);
			$scope.login = true;
		}
		);
	};
	$scope.sharePost = function(){
		facebookService.share();
	}

});

window.fbAsyncInit = function() {
	FB.init({ 
		appId: '545982349108484',
		status: true, 
		cookie: true, 
		xfbml: true,
		version: 'v2.12'
	});
};

