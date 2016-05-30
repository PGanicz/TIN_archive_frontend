'use strict';

/**
 * @ngdoc service
 * @name archiveApp.userService
 * @description
 * # loginService
 * Service in the archiveApp.
 */
angular.module('archiveApp')
  .service('userService', function ($sanitize, $rootScope, $cookieStore, $http, $q, ngNotify, md5) {

    this.performLogin = function (userName, password) {
      return $http({
        method: 'POST',
        url: '/user/login',
        params: {
          username: userName,
          password: md5.createHash(password)
        }
      }).then(function () {
        $cookieStore.put("userName", userName);
        $cookieStore.put("token", "TOKEN");

        $rootScope.authenticated = true;

        ngNotify.set('Udalo sie zalogowac!', 'success');
      }, function (response) {
        var status = response.status;

        if (status == 401)
          ngNotify.set('Podales niepoprawne dane!', 'error');
        else if (status == 406)
          ngNotify.set('Konto nieaktywne!', 'error');
        else
          ngNotify.set('Nieznany blad podczas logowania!', 'error');

        $rootScope.authenticated = false;
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
    };

    this.getUserData = function () {
      return $http.get('user/settings');
    };

    this.changePassword = function (old_password, new_password) {
      return $http({
        method: 'POST',
        url: '/user/settings',
        params: {
          password: md5.createHash(old_password),
          new_password: md5.createHash(new_password)
        }
      }).then(function () {
        ngNotify.set('Udalo sie zmienic haslo!', 'success');
        $('#changePasswordModal').modal('hide');
      }, function (error) {
        ngNotify.set('Podales niepoprawne haslo!', 'error');
      });
    };

    this.changeEmail = function (password, new_email) {
      return $http({
        method: 'POST',
        url: '/user/settings',
        params: {
          password: md5.createHash(password),
          email: new_email
        }
      }).then(function () {
        ngNotify.set('Udalo sie zmienic adres email!', 'success');
        $('#changeEMailModal').modal('hide');
      }, function (error) {
        ngNotify.set('Podales niepoprawne haslo!', 'error');
      });
    };

  }
);
