'use strict';

app.controller('SnapshotsCurrentUserController' ,['$routeParams', 'snapshots', '$scope', 'snapshot', 'authorization', 'users', function($routeParams, snapshots, $scope, snapshot, authorization, users) {
   // var userId;
    var user;
    var url = '/user/authorized';

    var successSnapshotsByUser = function (snapshotsUser) {
        var count = 1;
        var snapshotsUserOnSix = new Array();
        var times = new Array();
        var totalTime = 0;
        snapshotsUserOnSix[0] = new Array();

        for (var i = 23; i >= 0; i--) {
            snapshotsUserOnSix[i] = new Array();
            snapshotsUserOnSix[i][0] = {order : i};
        }

        for (var i = 23; i >= 0; i--) {
            for (var j = 6; j > 1; j--)
                snapshotsUserOnSix[i][j] = "";
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

        totalTime = 10 * snapshotsUser.length;
        $scope.snapshotsUser = snapshotsUserOnSix;
        $scope.snapshotsUserForCarousel = snapshotsUser;
        $scope.times = times;
        $scope.totalHours = Math.floor(totalTime / 60);
        $scope.totalMinutes = totalTime - $scope.totalHours * 60;
    };

    $scope.getFullImageSrc = function (snapshotId) {
        snapshot.snapshotById(snapshotId).success(successSnapshot);
    }

    var successSnapshot = function (result) {
        window.open("data:image/jpg;base64," + result.contentFile);
    }

    var successLogin = function (user) {
        //userId = currentItem.userId;
        $scope.date = moment().format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate($scope.userId,$scope.date).success(successSnapshotsByUser);
    };

    $scope.goToPreviousDate = function(date) {
        $scope.date = moment(new Date(date)).subtract(1, 'days').format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate($scope.userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.goToNextDate = function(date) {
        $scope.date = moment(new Date(date)).add(1, 'days').format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate($scope.userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.goToSelectedDate = function(date) {
        $scope.date = moment(new Date(date)).format('YYYY-MM-DD');
        snapshots.snapshotsByUserAndDate($scope.userId,$scope.date).success(successSnapshotsByUser);
    }

    $scope.isMoreOrEqualThanCurrentDate = function() {
        return moment().format('YYYY-MM-DD') ==  moment(new Date($scope.date)).format('YYYY-MM-DD');
    }

    $scope.convertTime = function(time) {
        return time + ":00";
    }

    var successUsers = function (userItems) {
        $scope.userItems = userItems;
    }

    authorization.login(url,window.localStorage.client).success(successLogin);

    users.getUsers().success(successUsers);

}])
