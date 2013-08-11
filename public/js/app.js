'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/content/:name', {controller: 'AppCtrl'})
    .otherwise({redirectTo: '/content/index'});
    $locationProvider.html5Mode(true);
  }]);
