'use strict';

var SnapshotsCurrentUserController = function($routeParams, snapshots, $scope, authorization) {
    var userId;
    var user;
    var url = '/user/authorized';

    var successSnapshotsByUser = function (snapshotsUser) {
        $scope.snapshotsUser = snapshotsUser;
    };

    var successLogin = function (user) {
        userId = user.id;
        snapshots.snapshotsByUser(userId).success(successSnapshotsByUser);
    };

    authorization.login(url,window.localStorage.client).success(successLogin);

}
