'use strict';

/**
 * @ngdoc service
 * @name gwintApp.userService
 * @description
 * # loginService
 * Service in the gwintApp.
 */
angular.module('gwintApp')
  .service('userService', function ($cookieStore, $http, $q) {

    this.performLogin = function (login, password) {
      // TODO usunac - tylko do testow
      $cookieStore.put("userName", login);
      $cookieStore.put("token", "Smieszke");

      return $http({
        method: 'POST',
        url: '/user/login',
        headers: {
          'Content-Type': 'application/json',
          'data-login': login,
          'data-password': password
        }
      }).then(function (response) {
        var token = response.data.token;
        var userName = response.data.userName;

        $cookieStore("userName", userName);
        $cookieStore("token", token);

        return $q.resolve(response.data);
      }, function (error) {
        var message = 'There was a problem logging in, check if the backend server is up and running. (Error ' + error.status + ': ' + error.statusText + ')';
        if (error.status === 401) {
          message = 'User is already registered: ' + email;
        }
        return $q.reject(message);
      });
    };

    this.performRegister = function (login, password, email) {
      return $http({
        method: 'POST',
        url: '/user/register',
        headers: {
          'Content-Type': 'application/json',
          'data-login': login,
          'data-password': password,
          'data-email': email
        }
      }).then(function (response) {
        var token = response.data.token;

        $cookieStore("token", token);

        return $q.resolve(response.data);
      }, function (error) {
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
      $cookieStore.remove("token");
      $cookieStore.remove("userName");
    };

    this.getUserName = function() {
      return $cookieStore.get("userName");
    }

  }
);
