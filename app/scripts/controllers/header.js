'use strict';

/**
 * @ngdoc function
 * @name gwintApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the gwintApp
 */
angular.module('gwintApp')
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

    $scope.logout = function () {
      userService.logout();
      $scope.isLogged = false;

      window.alert("Wylogowano");
    }

  });
