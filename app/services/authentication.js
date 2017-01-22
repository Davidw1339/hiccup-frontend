'use strict'

var app = angular.module('myApp.authentication', []);

app.service('authentication', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
