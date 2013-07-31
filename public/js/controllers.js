'use strict';

/* Controllers */
function AppCtrl($scope, $routeParams, $location, Sites) {
  $scope.load = function(p){
      Sites.markdown({path: p}, function(data){
        console.log(data.content);
        //$scope.markdown = data.content;
        session.setValue(data.content);
      });  
  }
	Sites.get(function(data){
    $scope.name = data.name;
  });

  Sites.content(function(data){
    $scope.content = data.content;
  });
}

function EditCtrl($scope, $route, $routeParams, Sites){
 
  Sites.markdown(function(data){
    $scope.markdown = data.content;
  });  
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
