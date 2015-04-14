'use strict';

app.controller('WorkDiaryController', [ '$scope', 'workDiaryService', 'companyService', function ($scope, workDiaryService, companyService) {

    var successGetCompanies  = function (result) {
        $scope.companies = result.companiesDetailsDTO;
        $scope.departments = result.departmentDetailsDTOs;
        $scope.projects = result.projectDTOs;
    };

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
        var projectsFilter = [];
        $scope.project != undefined ? projectsFilter.push($scope.project) : projectsFilter = $scope.projects;
        workDiaryService.getHoursByUserFromPeriod(projectsFilter ,$scope.period, $scope.startDate, $scope.endDate).success(successGetHoursByUserFromPeriod);
    }

    $scope.period = 'DAY';

    companyService.companies().success(successGetCompanies);

}]);
