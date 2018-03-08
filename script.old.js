var myApp = /**
* todoApp Module
*
* Description
*/
angular.module('loginApp', [])

.service('fbLogin',  function($http){
		///////////////
		window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId      : '545982349108484', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
  });
    
    // Check whether the user already logged in
    FB.getLoginStatus(function(response) {
    	if (response.status === 'connected') {
            //display user data
            getFbUserData();
        }
    });
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
this.fbLogin = function () {
	FB.login(function (response) {
		if (response.authResponse) {
            // Get and display the user profile data
            console.log('return data');
            getFbUserData();
        } else {
        	document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
        p= response;}, {scope: 'email'});
	return p;
}
p='';
// Fetch the user profile data from facebook
function getFbUserData(){
	FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
		function (response) {
			// document.getElementById('fbLink').setAttribute("ng-click","fbLogout()");
			document.getElementById('fbLink').innerHTML = 'Logged in Facebook';
			document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
			p = response;
			// console.log(p);
		});
}
this.data = function(){
	return p;
}

// Logout from facebook
this.fbLogout = function() {
	FB.logout(function() {
		document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
		document.getElementById('fbLink').innerHTML = 'Login Again';
		document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
	});
}

this.fbData = function(){
	$http.get('http://graph.facebook.com/v2.12/me?fields=id,name,email,birthday,address')
	.then(function(response){
		return response.data;
	})
}

	///////////////
	
})

.controller('loginCon', function($scope,fbLogin){

	// fbLogin.fbLogin();
	// $scope.user = fbLogin.data();
	console.log(fbLogin.fbData());

	$scope.fbLogin = function(){
		$scope.user = fbLogin.fbLogin();
		console.log('Login Called');

	}
	$scope.fbLogout = function(){
		fbLogin.fbLogout();
	}
});



