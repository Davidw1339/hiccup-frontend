'use strict';

angular.module('myApp.mainview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'mainview/mainview.html',
    controller: 'MainController'
  });
}])

.controller('MainController', ['$scope', '$location', '$route', function($scope, $location, $route) {
  $scope.liveposts = [
    {
      username: "hi boy",
      text: "yelloooo"
    }
  ];

  $('#new-post').on('keyup', function(e) {
    if (e.keyCode === 13) {
      var post = (e.target.value);
      if (post){
        $scope.addPost({
          username: "Test Username",
          text: post
        });
        e.target.value = "";
      }
    }
  });

  $scope.addPost = function(newPost) {
    $scope.liveposts.push(newPost);
    console.log($scope.liveposts);
    $scope.$apply();
  }

}]);
