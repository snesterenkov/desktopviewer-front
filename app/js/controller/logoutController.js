'use strict';

var LogoutController = function ($scope,authorization) {

    $scope.logout = function () {
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('password');
        $scope.authorizedUser = "";
        $scope.isLoggedIn = authorization.isLoggedIn();
    };
}
