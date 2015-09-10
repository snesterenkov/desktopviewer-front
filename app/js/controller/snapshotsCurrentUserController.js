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
            snapshotsUserOnSix[i][0] = {order: i};
        }

        for (var i = 23; i >= 0; i--) {
            for (var j = 6; j > 1; j--)
                snapshotsUserOnSix[i][j] = "";
        }

        for (var key in snapshotsUser) {
            var res = snapshotsUser[key].time.split(":");
            var hours = parseInt(res[0]);
            //+1 the first column is order
            var minutesBlock = Math.floor(res[1] / 10) + 1;
            if (!isNaN(hours) && !isNaN(minutesBlock))
                snapshotsUserOnSix[hours][minutesBlock] = snapshotsUser[key];
        }

        totalTime = 10 * snapshotsUser.length;
        $scope.snapshotsUser = snapshotsUserOnSix;
        $scope.snapshotsUserForCarousel = snapshotsUser;
        $scope.times = times;
        $scope.totalHours = Math.floor(totalTime / 60);
        $scope.totalMinutes = totalTime - $scope.totalHours * 60;

        $scope.calculateCollspan(snapshotsUser);
    };

    $scope.getFullImageSrc = function (snapshotId) {
        snapshot.snapshotById(snapshotId).success(successSnapshot);
    }

    $scope.calculateCollspan = function (snapshotsUser) {
        var messageArrayStart = new Array(25);
        var idArrayStart = new Array(25);
        var messageArrayEnd = new Array(25);
        var countSnap = new Array(144);
        var temp;
        var tempIndexMin;
        var tempIndexHours;
        for (var key in snapshotsUser) {
            if (snapshotsUser[key].message != undefined) {
                var res = snapshotsUser[key].time.split(":");
                var hours = parseInt(res[0]);
                //+1 the first column is order
                var minutesBlock = Math.floor(res[1] / 10) + 1;
                if(tempIndexHours - hours != 0) {
                    messageArrayStart[hours] = new Array(7);
                    messageArrayEnd[hours] = new Array(7);
                    idArrayStart[hours] = new Array(7);
                }
                if (!isNaN(hours) && !isNaN(minutesBlock) && snapshotsUser[key].message == temp && (tempIndexHours - hours == 0) && ((minutesBlock - messageArrayEnd[hours][tempIndexMin]) < 2)) {
                    messageArrayEnd[hours][minutesBlock] = minutesBlock;

                } else {
                    messageArrayStart[hours][minutesBlock] = minutesBlock;
                    messageArrayEnd[hours][minutesBlock] = minutesBlock;
                    idArrayStart[hours][minutesBlock] =  snapshotsUser[key].id;
                    temp = snapshotsUser[key].message;

                }
                tempIndexMin = minutesBlock;
                tempIndexHours = hours;
            }
        }

        for (var key in messageArrayEnd) {
            var total = 0;
            var temp = null;
            var keyTemp = null;
            for (var key2 in messageArrayEnd[key]) {

                if (temp != undefined && (messageArrayEnd[key][key2] - temp) > 1) {
                    countSnap[idArrayStart[key][messageArrayStart[key][keyTemp]]] = total;
                    total = 0;
                    keyTemp = null;
                }
                if (messageArrayEnd != undefined) {
                    total++;
                    if (keyTemp == null)
                        keyTemp = key2;
                }
                temp = messageArrayEnd[key][key2];
            }
            countSnap[idArrayStart[key][messageArrayStart[key][keyTemp]]] = total;
        }

        $scope.messageArrayStart = messageArrayStart;
        $scope.messageArrayEnd = messageArrayEnd;
        $scope.countSnap = countSnap;
    }

    $scope.getCountCollspan = function (file,x,y) {
        if(x != undefined)
            $scope.x = x;
        if(file != undefined)
            return $scope.messageArrayEnd[$scope.x][y] - $scope.messageArrayStart[$scope.x][y];
        else
            return '';
    };

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
