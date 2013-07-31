'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/view1', {templateUrl: 'partial/1', controller: MyCtrl1})
    .when('/:name', {controller: 'AppCtrl'})
    .when('/content/:name', {controller: 'AppCtrl'})
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);
