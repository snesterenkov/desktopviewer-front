'use strict';

app.controller('EmployeeController', ['$injector', '$scope', 'transferService', 'authorization', 'snapshots', 'snapshot', '$location', function(
    $injector, $scope, transferService, authorization, snapshots, snapshot,$location) {

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
        snapshots.snapshotsByUserAndDate($scope.user.id, $scope.date).success(successSnapshots);
    };

    $scope.goToSelectedDate = function(date) {
        $scope.date = moment(new Date(date)).format('YYYY-MM-DD');
        getSnapshotsByUserAndDate($scope.user, $scope.date);
    };

    $scope.goToPreviousDate = function(date) {
        $scope.date = moment(new Date(date)).subtract(1, 'days').format('YYYY-MM-DD');
        getSnapshotsByUserAndDate($scope.user, $scope.date);
    };

    $scope.goToNextDate = function(date) {
        $scope.date = moment(new Date(date)).add(1, 'days').format('YYYY-MM-DD');
        getSnapshotsByUserAndDate($scope.user, $scope.date);
    };

    var setDefultValuesForInfo = function() {
        $scope.startTime = '--';
        $scope.workTime = '--';
        $scope.productivity = '--';
    };

    var successSnapshots = function(snapshots) {
        setDefultValuesForInfo();
        if(snapshots.length){
            $scope.startTime = snapshots[0].time;
            $scope.workTime = getWorkTime(snapshots.length);
            var snapshotsUserOnSix = [];

            for (var i = 23; i >= 0; i--) {
                snapshotsUserOnSix[i] = [];
                snapshotsUserOnSix[i][0] = {order : i};
            }

            for (var i = 23; i >= 0; i--) {
                for (var j = 6; j >= 1; j--)
                    snapshotsUserOnSix[i][j] = "";
            }

            for (var i = 23; i >= 0; i--) {
                    snapshotsUserOnSix[i][7] = 0;
            }

            for (var key in snapshots)
            {
                var res = snapshots[key].time.split(":");
                var hours = parseInt(res[0]);
                //+1 the first column is order
                var minutes = Math.floor(res[1]/10) + 1;
                if(!isNaN(hours) && !isNaN(minutes))
                    snapshotsUserOnSix[hours][minutes] = snapshots[key];
                    snapshotsUserOnSix[hours][7] += 1;
            }
            $scope.snapshotsUser = snapshotsUserOnSix;
        } else {
            $scope.snapshotsUser = null;
        }

    };

    $scope.convertTime = function(time) {
        return time + ":00";
    };

    var getWorkTime = function(snapshotsCount) {
        return Math.floor((snapshotsCount * 10)/60) + "h" + (snapshotsCount * 10) % 60 + "m";

    };

    var getSnapshotsByUserAndDate = function(user, date) {
        snapshots.snapshotsByUserAndDate(user.id, date).success(successSnapshots);
    };

    $scope.getFullImageSrc = function(snapshotId) {
        snapshot.snapshotById(snapshotId).success(successSnapshot);
    };

    var successSnapshot = function (result) {
        window.open("data:image/jpg;base64," + result.contentFile);
    };

    setDefultValuesForInfo();
    authorization.login(url,window.localStorage.client).success(successLogin);

}]);
