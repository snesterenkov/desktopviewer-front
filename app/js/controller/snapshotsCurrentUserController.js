'use strict';

app.controller('SnapshotsCurrentUserController' ,['$routeParams', 'snapshots', '$scope', 'authorization', function($routeParams, snapshots, $scope, authorization) {
    var userId;
    var user;
    var url = '/user/authorized';

    var successSnapshotsByUser = function (snapshotsUser) {
        var count = 1;
        var snapshotsUserOnSix = new Array();
        var times = new Array();
        snapshotsUserOnSix[0] = new Array();

        for (var i = 24; i >= 0; i--) {
            snapshotsUserOnSix[i] = new Array();
            snapshotsUserOnSix[i][0] = {order : i};
        }

        for (var key in snapshotsUser)
        {
            var res = snapshotsUser[key].time.split(":");
            var hours = parseInt(res[0]);
            //+1 the first column is order
            var minutes = Math.floor(res[1]/10) + 1;
            if(!isNaN(hours) && !isNaN(minutes))
                snapshotsUserOnSix[hours][minutes] = snapshotsUser[key];
        }
        $scope.snapshotsUser = snapshotsUserOnSix;
        $scope.times = times;
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

    $scope.convertTime = function(time) {
        return time + ":00";
    }

    authorization.login(url,window.localStorage.client).success(successLogin);

}])
