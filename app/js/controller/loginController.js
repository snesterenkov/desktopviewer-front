'use strict';

var LoginController = function ($location, $injector, $scope, $rootScope, authorization) {


    var successAuthorizedUrl = 'user';
    var url = '/user/authorized';

    $scope.authorized = function (login, password) {
        window.localStorage.client = login;
        window.localStorage.password = password;

        var success = function (data) {
            $location.path(successAuthorizedUrl);
            $rootScope.$broadcast('successAuthorizedEvent');
        };

        var error = function (error) {
            window.localStorage.removeItem('client');
            window.localStorage.removeItem('password');

            $scope.loginForm.$setValidity("accessDenied",false);
        };

        authorization.login(url,login).success(success).error(error);

    };
}
