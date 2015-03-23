'use strict';

var SnapshotsCurrentUserController = function($routeParams, snapshots, $scope, authorization, $filter) {
    var userId;
    var user;
    var date;
    var currDate;
    var url = '/user/authorized';

    var successSnapshotsByUser = function (snapshotsUser) {
        $scope.snapshotsUser = snapshotsUser;
    };

    var successLogin = function (user) {
        userId = user.id;
        currDate = new Date();
        $scope.date = $filter('date')(new Date(), 'yyyy-M-dd', "UTC/GMT");
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    };

    $scope.goToPreviousDate = function() {
        $scope.date = $filter('date')(new Date().setDate(new Date(currDate).getDate() - 1), 'yyyy-M-dd', "UTC/GMT") ;
        currDate =  new Date().setDate(new Date(currDate).getDate() - 1);
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.goToNextDate = function() {
        $scope.date = $filter('date')(new Date().setDate(new Date(currDate).getDate() + 1), 'yyyy-M-dd', "UTC/GMT") ;
        currDate =  new Date().setDate(new Date(currDate).getDate() + 1);
        snapshots.snapshotsByUserAndDate(userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.isMoreOrEqualThanCurrentDate = function() {
        return new Date().setDate(new Date(currDate).getDate() + 1) >  new Date();
    }

    authorization.login(url,window.localStorage.client).success(successLogin);

}
