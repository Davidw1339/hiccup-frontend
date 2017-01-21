'use strict';

angular.module('myApp.loginview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginview/loginview.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', [function() {

}]);
