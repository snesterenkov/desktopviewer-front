'use strict';

app.controller('SnapshotsCurrentUserController' ,['$routeParams', 'snapshots', '$scope', 'authorization', function($routeParams, snapshots, $scope, authorization) {
    var userId;
    var user;
    var url = '/user/authorized';

    var successSnapshotsByUser = function (snapshotsUser) {
        $scope.snapshotsUser = snapshotsUser;
    };

    var successLogin = function (user) {
        userId = user.id;
        $scope.date = moment().format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    };

    $scope.goToPreviousDate = function(date) {
        $scope.date = moment(new Date(date)).subtract(1, 'days').format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.goToNextDate = function(date) {
        $scope.date = moment(new Date(date)).add(1, 'days').format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.goToSelectedDate = function(date) {
        $scope.date = moment(new Date(date)).format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.isMoreOrEqualThanCurrentDate = function() {
        return moment().format('YYYY-MM-DD') ==  moment(new Date($scope.date)).format('YYYY-MM-DD');
    }

    authorization.login(url,window.localStorage.client).success(successLogin);

}])
