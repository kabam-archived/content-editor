'use strict';

/* Services */
angular.module('myApp.services', ['ngResource'])
   .factory('Sites', ['$http', function($http){
    return{
      get: function(callback){
          $http.get('/api/name').success(function(data) {
          callback(data);
        });
      },

      content: function(callback){
          $http.get('/api/content').success(function(data) {
          callback(data);
        });
      },

      markdown: function(opts, callback){
        $http.get('/api' + opts.path).
          success(function(data, status) {
            console.log(data);
            callback(data);
          }).
          error(function(data, status){s
            return status
          });
      },

      saveContent: function(opts, data, callback){
        $http.post('/api' + opts.path, data).
        success(function(data, status) {
          console.log(status);
        }).
        error(function(data, status){
            return status
        });
      }
    };
}]);
