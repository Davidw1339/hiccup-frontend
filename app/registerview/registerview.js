'use strict';

angular.module('myApp.registerview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'registerview/registerview.html',
    controller: 'RegisterController'
  });
}])

.controller('RegisterController', [function() {

}]);
