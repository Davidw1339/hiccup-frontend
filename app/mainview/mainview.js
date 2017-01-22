'use strict';

angular.module('myApp.mainview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'mainview/mainview.html',
    controller: 'MainController'
  });
}])

.controller('MainController', ['$scope', '$location', '$route', '$http', 'authentication', function($scope, $location, $route, $http, authentication) {
  // Control who gets what permissions and whether we need to log in

  var user = authentication.getUser();
  if(user.name == "none") {
    $location.path('/login');
  }
  else {
    if(user.type != "hacker") {
      $('#poll_form').show();
    }
    if(user.type == "organizer") {
      console.log("Show the buttons");
      $('.right-btn').show();
    }
  }

  $scope.livepolls = [];
  $scope.liveposts = [];
  $scope.announcements = [];
  $scope.schedule = [];
  // get announcements
  $http({
    method: 'GET',
    url: 'https://hiccupbackend.herokuapp.com/get_announce'
  }).then(function successCallback(response) {
      console.log(response.data);
      response.data.forEach(function(announce) {
        var time = new Date(0);
        time.setUTCMilliseconds(announce.time);
        time = time.toString("h:mm a").substring(0, 25);
        // time = time.getHours() + ":" + time.getMinutes()
        // var time = (new Date(announce.time * 1000)).toString();
        $scope.announcements.push({
          'text': announce.text,
          'time': time
        });
      });
    }, function errorCallback(response) {
      console.log("LOL RIP YOU SUCK");
    });
  // get live posts
  $http({
    method: 'GET',
    url: 'https://hiccupbackend.herokuapp.com/get_messages'
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
  //get live polls
  $http({
    method: 'GET',
    url: 'https://hiccupbackend.herokuapp.com/get_poll'
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
  //get events for schedule
  $http({
    method: 'GET',
    url: 'https://hiccupbackend.herokuapp.com/get_event'
  }).then(function successCallback(response) {
      console.log(response.data);
      response.data.forEach(function(event) {
        $scope.schedule.push({
          'text': event.text,
          'time': event.time
        });
      });
      $scope.schedule.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.time) - new Date(a.time);
      });
      console.log("new sorted schedule " + $scope.schedule);
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

  $scope.newEvent = function () {
    var text = $("#eventbox").val()
    var time = $("#timebox").val()
    var event = {
      text: text,
      time: time
    }
    $("#eventbox").val("");
    $("#timebox").val("");
    $http({
      method: 'POST',
      url: 'https://hiccupbackend.herokuapp.com/add_event',
      // url: 'http://hiccupbackend.herokuapp.com/add_message',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: event,
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
    $scope.schedule.push(event);
  }

  $scope.newAnnouncement = function() {
    var text = $("#announcebox").val()
    var announcement = {
      text: text,
      time: Date.now()
    };
    $("#announcebox").val("");
    $http({
      method: 'POST',
      url: 'https://hiccupbackend.herokuapp.com/add_announce',
      // url: 'http://hiccupbackend.herokuapp.com/add_message',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: announcement,
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
    var time = new Date(0);
    time.setUTCMilliseconds(announcement.time);
    time = time.toString("h:mm a").substring(0, 25);
    // announcement.time = time;
    $scope.announcements.push({text: text, time: time});
  }

  $scope.addPoll = function() {
    var title = $("#poll_title").val();
    var text = $("#poll_text").val();
    $("#poll_title").val("");
    $("#poll_text").val("");
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
      text: text,
      up: "0",
      down: "0"
    };
    $http({
      method: 'POST',
      url: 'https://hiccupbackend.herokuapp.com/add_poll',
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
      url: 'https://hiccupbackend.herokuapp.com/add_message',
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
    $scope.livepolls[index].up += "1";
    console.log($scope.livepolls[index].up);
    $http({
      method: 'POST',
      url: 'https://hiccupbackend.herokuapp.com/up_vote',
      // url: 'http://hiccupbackend.herokuapp.com/add_message',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: index,
        up: $scope.livepolls[index].up
      },
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
  }

  $scope.pressDislike = function(index) {
    console.log(index);
    $scope.livepolls[index].down += "1";
    $http({
      method: 'POST',
      url: 'https://hiccupbackend.herokuapp.com/down_vote',
      // url: 'http://hiccupbackend.herokuapp.com/add_message',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: index,
        down: $scope.livepolls[index].down
      },
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
  }

}]);
