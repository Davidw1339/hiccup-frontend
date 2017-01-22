'use strict';

angular.module('myApp.registerview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'registerview/registerview.html',
    controller: 'RegisterController'
  });
}])

.controller('RegisterController', ['$scope', '$location', '$route', '$http', function($scope, $location, $route, $http) {
  $scope.type = "null";
  $scope.hacker = function() {
    $scope.type = "hacker";
    $scope.onRegister();
  }
  $scope.organizer = function() {
    $scope.type = "organizer";
    $scope.onRegister();
  }
  $scope.sponsor = function () {
    $scope.type = "sponsor";
    $scope.onRegister();
  }

  $scope.onRegister = function() {
    //move to main page
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();
    console.log(email + " " + password + " " + $scope.type);
    var regRequest = {
      method: 'POST',
      url: 'http://hiccupbackend.herokuapp.com/register',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        email: email,
        password: password,
        type: $scope.type
      }
    };
    console.log(regRequest);
    $http(regRequest).then(function success(response) {
      if(response.data == "registered") {
        console.log("We win!");
      }
      else {
        console.log("We lose!");
      }
    }, function error(response) {
      console.log("rip, we got register error");
    });

    //
  }
}]);
