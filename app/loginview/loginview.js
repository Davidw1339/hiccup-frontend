'use strict';

angular.module('myApp.loginview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginview/loginview.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', ['$scope', '$location', '$route', '$http', 'authentication', function($scope, $location, $route, $http, authentication) {
  $scope.onLogin = function() {
    //move to main page
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();
    console.log(email + " " + password);
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:5000/login?email=' + email + "&password=" + password
    }).then(function successCallback(response) {
        if(response.data != "no-auth") {
          authentication.setUser({
            name: email,
            type: response.data
          });
          $location.path("/main");
        }
        else {
          $('#error').show();
        }
      }, function errorCallback(response) {
        $('#error').show();
      });
    //
  }
  $scope.onRegister = function() {
    console.log("does it work?")
    $location.path("/register");
  }
}]);
