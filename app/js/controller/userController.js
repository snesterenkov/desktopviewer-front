'use strict';

app.controller('UserController',[ '$injector', '$scope', 'User', function($injector, $scope, User) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: User
    })
}]);
