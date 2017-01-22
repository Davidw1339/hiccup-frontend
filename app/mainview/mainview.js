'use strict';

angular.module('myApp.mainview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'mainview/mainview.html',
    controller: 'MainController'
  });
}])

.controller('MainController', ['$scope', '$location', '$route', '$http', 'authentication', function($scope, $location, $route, $http, authentication) {
  // console.log(authentication.myFunc(255));
  $scope.livepolls = [];
  $scope.liveposts = [];
  $http({
    method: 'GET',
    url: 'http://localhost:5000/get_messages'
  }).then(function successCallback(response) {
      console.log(response.data);
      response.data.forEach(function(message) {
        $scope.liveposts.push({
          'username': message.email,
          'text': message.text
        });
      });
    }, function errorCallback(response) {
      console.log("LOL RIP YOU SUCK");
    });

  $http({
    method: 'GET',
    url: 'http://localhost:5000/get_poll'
  }).then(function successCallback(response) {
      console.log(response.data);
      response.data.forEach(function(poll) {
        $scope.livepolls.push({
          'id': poll.id,
          'title': poll.title,
          'text': poll.text,
          'up': poll.up,
          'down': poll.down
        });
      });
    }, function errorCallback(response) {
      console.log("LOL RIP YOU SUCK");
    });
  console.log(authentication);

  $('#new-post').on('keyup', function(e) {
    if (e.keyCode === 13) {
      var post = (e.target.value);
      if (post){
        $scope.addPost({
          username: authentication.getUser().name,
          text: post
        });
        e.target.value = "";
      }
    }
  });

  $scope.addPoll = function() {
    var title = $("#poll_title").val();
    var text = $("#poll_text").val();
    $("#poll_title").val() = "";
    $("#poll_text").val() = "";
    var id = 0;
    if($scope.livepolls.length > 0) {
      id = $scope.livepolls[$scope.livepolls.length - 1].id + 1;
    }
    else {
      id = 0;
    }
    var poll = {
      id: id,
      title: title,
      text: text
    };
    $http({
      method: 'POST',
      url: 'http://localhost:5000/add_poll',
      // url: 'http://hiccupbackend.herokuapp.com/add_message',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: poll,
      transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          }
    }).then(function success(response) {
        console.log("success");
    }, function error(response) {
      console.log("rip, we got register error");
    });
    $scope.livepolls.push(poll);
  }

  $scope.addPost = function(newPost) {
    $http({
      method: 'POST',
      url: 'http://localhost:5000/add_message',
      // url: 'http://hiccupbackend.herokuapp.com/add_message',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: newPost,
      transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          }
    }).then(function success(response) {
      console.log("success");
    }, function error(response) {
      console.log("rip, we got register error");
    });
    $scope.liveposts.push(newPost);
    console.log($scope.liveposts);
    $scope.$apply();
  }

  $scope.pressLike = function(index) {
    console.log(index);
    $scope.livepolls[index].up += 1;
    
  }

  $scope.pressDislike = function(index) {
    console.log(index);
    $scope.livepolls[index].down += 1;
  }

}]);
