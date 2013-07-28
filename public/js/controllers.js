'use strict';

/* Controllers */

function AppCtrl($scope, Sites) {
	Sites.get(function(data){
		console.log(data);
      $scope.name = data.name;
    });

    Sites.content(function(data){
      $scope.content = data.content;
      console.log(data);
    });
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
