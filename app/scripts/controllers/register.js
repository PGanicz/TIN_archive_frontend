'use strict';

/**
 * @ngdoc function
 * @name archiveApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the archiveApp
 */
angular.module('archiveApp')
  .controller('RegisterCtrl', function ($scope, $location, userService) {
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

      userService.performRegister($scope.form.login, $scope.form.password, $scope.form.email).then(function () {
      }, function (error) {
      }).finally(function () {
        $scope.inProgress = false;
        btn.removeAttr('disabled');
        $location.path('/home');
      });
    }
  });
