'use strict';

/* Controllers */
function AppCtrl($scope, $routeParams, $location, Sites) {
  $scope.load = function(p){
      Sites.markdown(p, function(data){
        $scope.markdown = data.content;
        console.log(data);
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
