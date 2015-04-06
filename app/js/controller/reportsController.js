/**
 * Created by human on 03.04.2015.
 */
'use strict';

app.controller('ReportsController',['$scope',function($scope){

    var setEndDateBiggerEqualStartDate = function(){
        if($scope.startDate > $scope.endDate)
            $scope.endDate =  moment(new Date($scope.startDate)).format('YYYY-MM-DD');
    };

    $scope.goToSelectedStartDate(startDate);



}]);
