'use strict';

app.controller('LogoutController',['$scope','authorization', function ($scope,authorization) {

    $scope.logout = function () {
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('password');
        window.localStorage.removeItem('token');
        $scope.authorizedUser = "";
        $scope.isLoggedIn = authorization.isLoggedIn();
    };
}])
