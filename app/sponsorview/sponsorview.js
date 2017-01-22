'use strict';

angular.module('myApp.sponsorview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sponsor', {
    templateUrl: 'sponsorview/sponsorview.html',
    controller: 'SponsorController'
  });
}])

.controller('SponsorController', ['$scope', function($scope) {
    var Company1={
      CompanyImageURL: "../images/githubStockPic.png",
      CompanyName: "Company 1",
      AboutUs: "We are company unoooo",
      APIs: "We got this nice nice one API",
      PrizesContests: "We got one prize boiiii",
      Swag: "Capital 1 T-Shirt and coffee cereal"
    };
    var Company2={
      CompanyImageURL: "../images/githubStockPic1.png",
      CompanyName: "Company 2",
      AboutUs: "We are company toooooo",
      APIs: "Tu",
      PrizesContests: "Only got tuu",
      Swag: "T-Shirt and Pens"
    };
    var Company3={
      CompanyImageURL: "../images/githubStockPic2.png",
      CompanyName: "Company 3",
      AboutUs: "We are company thrrrreeee",
      APIs: "Tree",
      PrizesContests: "Only got that third one from the top",
      Swag: "Water bottles and discs"
    };
    $scope.companyArray=[Company1,Company2,Company3];
    $scope.companyNum = 0;
}]);
