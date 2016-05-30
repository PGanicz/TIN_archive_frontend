'use strict';

/**
 * @ngdoc function
 * @name archiveApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the archiveApp
 */
angular.module('archiveApp')
  .controller('UserCtrl', function ($scope, ngNotify, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    userService.getUserData().then(function (response) {
        $scope.username = response.data.username;
        $scope.email = response.data.email;
      }
    );

    $scope.changeUserPassword = function () {
      var oldPassword = $scope.change.oldPassword;
      var newPassword = $scope.change.newPassword;
      var repeatedNewPassword = $scope.change.newPasswordRepeated;

      if (repeatedNewPassword === newPassword)
        userService.changePassword(oldPassword, newPassword);
      else
        ngNotify.set('Hasla musza sie zgadzac!', 'error');
    };

    $scope.changeUserEMail = function () {
      var password = $scope.change.currentPassword;
      var newEmail = $scope.change.newEMail;
      var repeatedNewEmail = $scope.change.newEMailRepeated;

      if (newEmail === repeatedNewEmail)
        userService.changeEmail(password, newEmail);
      else
        ngNotify.set('Adresy email musza sie zgadzac!', 'error');
    };

    $scope.isEmailsEqual = function () {
      return $scope.change.newEMail === $scope.change.newEMailRepeated;
    };

    $scope.isPasswordsEqual = function () {
      return $scope.change.newPassword === $scope.change.newPasswordRepeated;
    };

  });
