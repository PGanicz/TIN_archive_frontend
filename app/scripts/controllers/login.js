'use strict';

/**
 * @ngdoc function
 * @name gwintApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gwintApp
 */
angular.module('gwintApp')
  .controller('LoginCtrl', function ($scope, $location, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.inProgress = false;

    if(userService.isLoggedIn()) {
      $location.path('#/');
    }

    $scope.performLogin = function () {
      $scope.inProgress = true;

      var btn = $('#log-btn');
      btn.attr('disabled', 'disabled');

      userService.performLogin($scope.login.login, $scope.login.password).then(function () {
      }, function (error) {
      }).finally(function () {
        $scope.inProgress = false;
        btn.removeAttr('disabled');
        $location.path('#/');
      });
    }
  });
