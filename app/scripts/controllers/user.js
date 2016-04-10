'use strict';

/**
 * @ngdoc function
 * @name gwintApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the gwintApp
 */
angular.module('gwintApp')
  .controller('UserCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.changeUserPassword = function () {
      // todo
    };

    $scope.changeUserEMail = function () {
      // todo
      window.alert($scope.change.newEMail);
    };

    $scope.changeMainCard = function () {
      // todo
    };

  });
