'use strict';

var LoginController = function ($location, $injector, $scope, $rootScope, $http, SERVER_URL, authorization) {

    var successAuthorizedUrl = 'user';
    var url = '/user/authorized';

    $scope.authorized = function (login, password) {
        window.sessionStorage.client = login;
        window.sessionStorage.password = password;

        var success = function (data) {
            $location.path(successAuthorizedUrl);
        };

        var error = function (error) {
            window.sessionStorage.removeItem('client');
            window.sessionStorage.removeItem('password');

            $scope.loginForm.$setValidity("accessDenied",false);
            $scope.accessDeniedMessage = error.message;
        };

        authorization.login(url,login).success(success).error(error);

    };
}
