'use strict';

angular.module('myApp.mainview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'mainview/mainview.html',
    controller: 'MainController'
  });
}])

.controller('MainController', ['$scope', '$location', '$route', function($scope, $location, $route) {
  
}]);
