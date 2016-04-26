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

    this.performLogin = function (userName, password) {
      var Indata = {username: 'aa', password: 'bb'};
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
        window.alert("OK");
        $cookieStore.put("userName", userName);
        $cookieStore.put("token", "TOKEN");

        //return $q.resolve(response.data);
      }, function (error) {
        window.alert("DUPA");
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
      $http.get('user/logout').then(function () {
          $cookieStore.remove("token");
          $cookieStore.remove("userName");
        },
        function () {
          window.alert("Nie udalo sie wylogowac!");
        }
      )
    };

    this.getUserName = function () {
      return $cookieStore.get("userName");
    }
  }
);
