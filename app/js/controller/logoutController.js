'use strict';

var LogoutController = function ($location, $injector, $scope) {

    var url = '/login';

    $scope.logout = function () {
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('password');
        $location.path(url);
    };
}
