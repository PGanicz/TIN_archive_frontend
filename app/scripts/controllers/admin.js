'use strict';

/**
 * @ngdoc function
 * @name archiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the archiveApp
 */
angular.module('archiveApp')
  .controller('AdminCtrl', function ($http,$scope,$rootScope,userService,ngNotify) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if(userService.isLoggedIn())
    {
      $http({
        method: 'GET',
        url: '/admin/unactive'
      }).then(function (response) {
        console.log(response);
        $scope.unActiveUsers = response.data;
      }, function (response) {

      });
    }
    $scope.activate = function (user) {
      console.log("Activate");
      return $http({
          method: 'POST',
          url: '/admin/activate',
          dataType: 'json',
          data: {
            'username': user.username,
            'password': user.password,
            'email': user.email
          }
      }).then(function (response) {
        var i;
        for(i = 0 ; i < $scope.unActiveUsers.length;i++) {
          if($scope.unActiveUsers[i].email == user.email){
            break;
          }
        }
        $scope.unActiveUsers.splice(i,1);

        ngNotify.set('Email został wysłany!', 'success');
      }, function (response) {

        ngNotify.set('Bład serwera!', 'success');
      });
    }
  });
