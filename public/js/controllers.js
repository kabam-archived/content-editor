'use strict';

/* Controllers */

function AppCtrl($scope, Sites) {
	Sites.get(function(data){
      $scope.name = data.name;
    });
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
