'use strict';

/**
 * @ngdoc function
 * @name archiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the archiveApp
 */
angular.module('archiveApp')
  .controller('FilesCtrl', function ($http,$scope,userService) {

    if(userService.isLoggedIn())
    {
      $http({
        method: 'GET',
        url: '/files/all'
      }).then(function (response) {
        console.log(response);
        $scope.files = response.data;
      }, function (response) {
        console.log("zle");
        var status = response.status;
        $rootScope.authenticated = false;
      });
    }
  });
