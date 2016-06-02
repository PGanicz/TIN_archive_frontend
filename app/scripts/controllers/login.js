'use strict';

/**
 * @ngdoc function
 * @name archiveApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the archiveApp
 */
angular.module('archiveApp')
  .controller('LoginCtrl', function ($rootScope, $http, $scope, $location, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.inProgress = false;

    if (userService.isLoggedIn()) {
      $location.path('#/');
    }

    $scope.performLogin = function () {
      $scope.inProgress = true;

      var btn = $('#log-btn');
      btn.attr('disabled', 'disabled');

      userService.performLogin($scope.username, $scope.password);
      userService.checkAdmin();
      $scope.inProgress = false;
      btn.removeAttr('disabled');
      $location.path('#/');
    }

  });

