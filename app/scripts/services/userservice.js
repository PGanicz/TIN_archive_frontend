'use strict';

/**
 * @ngdoc service
 * @name gwintApp.userService
 * @description
 * # loginService
 * Service in the gwintApp.
 */
angular.module('gwintApp')
  .service('userService', function ($cookieStore, $http, $q, ngNotify) {

    this.performLogin = function (userName, password) {
      $http({
        method: 'POST',
        url: '/user/login',
        params: {
          username: userName,
          password: password
        }
      }).then(function (response) {
        //var token = response.data.token;
        //var userName = response.data.userName;
        $cookieStore.put("userName", userName);
        $cookieStore.put("token", "TOKEN");

        ngNotify.set('Zalogowales sie', 'success');
        //return $q.resolve(response.data);
      }, function (error) {
        ngNotify.set('Nie udalo sie zalogowac', 'error');
      });
    };

    this.performRegister = function (login, password, email) {
      return $http({
        method: 'POST',
        url: 'user/register',
        dataType: 'json',
        data: {
          'username': login,
          'password': password,
          'email': email
        }
      }).then(function (response) {
        ngNotify.set('Udalo sie zarejestrowac', 'success');
        return $q.resolve(response.data);
      }, function (error) {
        ngNotify.set('Nie udalo sie zarejestrowac', 'error');
        var message = 'There was a problem logging in, check if the backend server is up and running. (Error ' + error.status + ': ' + error.statusText + ')';
        if (error.status === 401) {
          message = 'User is already registered: ' + email;
        }
        return $q.reject(message);
      });
    };

    this.isLoggedIn = function () {
      return $cookieStore.get("token") != null;
    };

    this.logout = function () {
      $http.get('user/logout').then(function () {
          ngNotify.set('Wylogowano', 'success');
          $cookieStore.remove("token");
          $cookieStore.remove("userName");
        },
        function () {
          ngNotify.set('Blad podczas wylogowywania', 'error');
        }
      )
    };

    this.getUserName = function () {
      return $cookieStore.get("userName");
    }
  }
);
