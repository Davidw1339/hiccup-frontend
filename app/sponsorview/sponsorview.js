'use strict';

angular.module('myApp.sponsorview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sponsor', {
    templateUrl: 'sponsorview/sponsorview.html',
    controller: 'SponsorController'
  });
}])

.controller('SponsorController', [function() {

}]);
