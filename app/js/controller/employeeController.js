'use strict';

app.controller('EmployeeController', ['$injector', '$scope', 'transferService', 'authorization', '$location', function($injector, $scope, transferService, authorization, $location) {

    var url = '/user/authorized';
    $scope.date = {};
    $scope.user = {};

    var successLogin = function(user) {
        if( $location.path()==='/my' ) {
            $scope.user = user;
            $scope.date = moment(new Date()).format('YYYY-MM-DD');
        } else {
            $scope.user = transferService.getField('user');
            $scope.date = transferService.getField('date');
        }
    };

    authorization.login(url,window.localStorage.client).success(successLogin);

}]);
