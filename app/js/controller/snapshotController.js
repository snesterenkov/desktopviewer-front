'use strict';

var SnapshotController = function($routeParams, snapshots, $scope) {
    var userId = $routeParams.id;
    var success = function (snapshotsUser) {
        $scope.snapshotsUser = snapshotsUser;
    };
    snapshots.snapshotsByUser(userId).success(success);

}
