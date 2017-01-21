'use strict';

angular.module('myApp.loginview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginview/loginview.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', ['$scope', '$location', '$route', function($scope, $location, $route) {
  $scope.onLogin = function() {
    console.log("YOLO");
  }
  $scope.onRegister = function() {
    console.log("does it work?")
    $location.path("/register");
  }
}]);
