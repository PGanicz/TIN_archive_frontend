'use strict';

/**
 * @ngdoc service
 * @name gwintApp.userService
 * @description
 * # loginService
 * Service in the gwintApp.
 */
angular.module('gwintApp')
  .service('userService', function ($sanitize, $rootScope, $cookieStore, $http, $q, ngNotify, md5) {

    this.performLogin = function (userName, password) {
      $http({
        method: 'POST',
        url: '/user/login',
        params: {
          username: userName,
          password: md5.createHash(password)
        }
      }).then(function (response) {
        //var token = response.data.token;
        //var userName = response.data.userName;
        $cookieStore.put("userName", userName);
        $cookieStore.put("token", "TOKEN");
        $rootScope.authenticated = true;
        ngNotify.set('Udalo sie zalogowac!', 'success');
      }, function (error) {
        $rootScope.authenticated = false;
        ngNotify.set('Podales niepoprawne dane!', 'error');
      });
    };

    this.performRegister = function (login, password, email) {
      return $http({
        method: 'POST',
        url: 'user/register',
        dataType: 'json',
        data: {
          'username': login,
          'password': md5.createHash(password),
          'email': email
        }
      }).then(function (response) {
        ngNotify.set('Zalozono konto!', 'success');
      }, function (error) {
        ngNotify.set('Nie udalo sie zalozyc konta!', 'error');
      });
    };

    this.isLoggedIn = function () {
      return $cookieStore.get("token") != null;
    };

    this.logout = function () {
      $http.get('user/logout').then(function () {
          $cookieStore.remove("token");
          $cookieStore.remove("userName");
          ngNotify.set('Wylogowano!', 'success');
        },
        function () {
          ngNotify.set('Nie udalo sie wylogowac!', 'error');
        }
      )
    };

    this.getUserName = function () {
      return $cookieStore.get("userName");
    }
  }
);
