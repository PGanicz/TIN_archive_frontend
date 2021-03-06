'use strict';

/**
 * @ngdoc function
 * @name archiveApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the archiveApp
 */
angular.module('archiveApp')
  .controller('HeaderCtrl', function ($scope, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isLoggedIn = function () {
      var isLogged = userService.isLoggedIn();
      if (isLogged)
        $scope.userName = userService.getUserName();

      return isLogged;
    };
    $scope.isAdmin = function() {
        return userService.isAdmin();
    }
    $scope.logout = function () {
      userService.logout();
      $scope.isLogged = false;
    }

  });
