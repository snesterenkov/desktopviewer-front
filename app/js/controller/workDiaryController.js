'use strict';

app.controller('WorkDiaryController', [ '$scope', 'workDiary', function ($scope, workDiary) {

    $scope.period = 'DAY';

    var successGetHoursByUserFromPeriod  = function (hoursOnDate) {
        $scope.hoursOnDate  = hoursOnDate;
    };

    $scope.setStartDate = function(startDate) {
        $scope.startDate = moment(new Date(startDate)).format('YYYY-MM-DD');
    }

    $scope.setEndDate = function(endDate) {
        $scope.endDate = moment(new Date(endDate)).format('YYYY-MM-DD');
    }

    $scope.applyFilters = function(period) {
        workDiary.getHoursByUserFromPeriod($scope.period, $scope.startDate, $scope.endDate).success(successGetHoursByUserFromPeriod);
    }

    $scope.getPeriodEndDate =  function(date) {
        if($scope.period == 'WEEK') {
            return moment(new Date(date)).add(6, 'days').format('YYYY-MM-DD');
        }
        if($scope.period == 'MONTH') {
            return moment(new Date(date)).add(29, 'days').format('YYYY-MM-DD');
        }
        if($scope.period == 'YEAR') {
            return moment(new Date(date)).add(364, 'days').format('YYYY-MM-DD');
        }
    }

}]);
