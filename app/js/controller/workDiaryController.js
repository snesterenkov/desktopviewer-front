'use strict';

app.controller('WorkDiaryController', [ '$scope', 'projectTransfer', 'workDiaryService', 'companyService', function ($scope, projectTransfer,workDiaryService, companyService) {

    var successGetCompanies  = function (result) {
        $scope.companies = result.companiesDetailsDTO;
        $scope.departments = result.departmentDetailsDTOs;
        $scope.projects = result.projectDTOs;
    };

    var successGetHoursByUserFromPeriod  = function (hoursOnDate) {
        $scope.hoursOnDate  = hoursOnDate;
    };

    function checkEndDate(){
        return $scope.startDate > $scope.endDate? $scope.startDate: $scope.endDate;
    }

    function limitDate(date){
        var today = moment(new Date()).format('YYYY-MM-DD');
        return date > today? today:date;
    }

    $scope.setStartDate = function(date) {
        $scope.startDate = moment(new Date(date)).format('YYYY-MM-DD');
        $scope.startDate = limitDate($scope.startDate);
        $scope.endDate = checkEndDate();
    }

    $scope.setEndDate = function(date) {
        $scope.endDate = moment(new Date(date)).format('YYYY-MM-DD');
        $scope.endDate = limitDate($scope.endDate);
        $scope.endDate = checkEndDate();
    }

    $scope.applyFilters = function(period) {
        var projectsFilter = [];
        $scope.project != undefined ? projectsFilter.push($scope.project) : projectsFilter = $scope.projects;
        workDiaryService.getHoursByUserFromPeriod(projectsFilter ,$scope.period, $scope.startDate, $scope.endDate).success(successGetHoursByUserFromPeriod);
    }

    $scope.checkProject = function(){
        $scope.company = projectTransfer.company;
        $scope.department = projectTransfer.department;
        $scope.project = projectTransfer.project;
    }

    $scope.period = 'DAY';

    companyService.companies().success(successGetCompanies);
    $scope.checkProject();

}]);
