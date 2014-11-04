'use strict';

var UserController = function($injector, $scope, User) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: User
    })

    $scope.authorizedUser = window.sessionStorage.client;

}
