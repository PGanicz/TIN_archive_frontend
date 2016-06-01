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
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if(userService.isLoggedIn())
    {
      $http({
        method: 'GET',
        url: '/files/all'
      }).then(function (response) {
        console.log(response);
        $scope.files = response.data;
      }, function (response) {
        var status = response.status;

        ngNotify.set('Nieznany blad podczas pobierania listy plikow!', 'error');
        $rootScope.authenticated = false;
      });
    }
  });
