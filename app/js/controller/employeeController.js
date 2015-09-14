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

    $scope.goToSelectedDate = function(date) {
        $scope.date = moment(new Date(date)).format('YYYY-MM-DD');
    };

    $scope.goToPreviousDate = function(date) {
        $scope.date = moment(new Date(date)).subtract(1, 'days').format('YYYY-MM-DD');
    };

    $scope.goToNextDate = function(date) {
        $scope.date = moment(new Date(date)).add(1, 'days').format('YYYY-MM-DD');
    };

    authorization.login(url,window.localStorage.client).success(successLogin);

}]);
