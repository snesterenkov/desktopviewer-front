'use strict';

app.controller('EmployeesController',['$injector','$scope', '$location', 'ClientCompanies', 'ClientDepartments', 'ClientProjects', 'UsersStats','transferService', function(
        $injector, $scope, $location,ClientCompanies, ClientDepartments, ClientProjects, UsersStats,transferService) {

    $scope.users = {};
    $scope.date = moment(new Date()).format('YYYY-MM-DD');

    $scope.getProjects = function() {
        var successGetProjects = function(projects) {
            $scope.projects = projects;
            $scope.allProjects = [].concat(projects);
            $scope.filterUsers();
            $scope.getCompanies();
        };
        ClientProjects.getProjects().success(successGetProjects);
    };

    $scope.getCompanies = function() {
        var successGetCompanies = function(companies) {
            $scope.companies = companies;
            $scope.departments = collectDepartments($scope.companies);
        };
        ClientCompanies.getCompanies().success(successGetCompanies);
    };

    var collectDepartments = function(companies) {
        companies = [].concat(companies);
        var departments = [];
        angular.forEach(companies, function(v, k) {
            departments = departments.concat(v.departmentsDTO);
        });
        return departments;
    };

    $scope.filterDepartments = function() {
        $scope.selectedDepartment = null;
        $scope.departments = collectDepartments($scope.selectedCompany || $scope.companies);
        $scope.filterProjects();
    };

    var collectProjects = function(departments, projects) {
        var departments = [].concat(departments);
        var collectedProjects = [];
        angular.forEach(departments, function(vd, k) {
            angular.forEach(projects, function(vp, k) {
                if(vp.departmentId === vd.id){
                    collectedProjects.push(vp);
                }
            });
        });
        return collectedProjects;
    };

    $scope.filterProjects = function() {
        $scope.selectedProject = null;
        $scope.projects = collectProjects($scope.selectedDepartment || $scope.departments, $scope.allProjects);
        $scope.filterUsers();
    };

    var collectUsers = function(projects){
        projects = [].concat(projects);
        var users = {};
        angular.forEach(projects, function(vp, k) {
            angular.forEach(vp.userDTOs, function(vu, k) {
                users[vu.id] = vu;
            });
        });
        return users;
    };

    $scope.filterUsers = function() {
        $scope.users = collectUsers($scope.selectedProject || $scope.projects);
    };

    $scope.goToEmployeePage = function(user) {
        transferService.setField('user', user);
        transferService.setField('date', angular.copy($scope.date));
        $location.path('/employee');
    };

    $scope.goToSelectedDate = function(date) {
        $scope.date = moment(new Date(date)).format('YYYY-MM-DD');
        UsersStats.getUsersStats($scope.date).success(successStats);
    };

    $scope.goToPreviousDate = function(date) {
        $scope.date = moment(new Date(date)).subtract(1, 'days').format('YYYY-MM-DD');
        UsersStats.getUsersStats($scope.date).success(successStats);
    };

    $scope.goToNextDate = function(date) {
        $scope.date = moment(new Date(date)).add(1, 'days').format('YYYY-MM-DD');
        UsersStats.getUsersStats($scope.date).success(successStats);
    };

    var successStats = function(stats) {
        $scope.stats = stats;
    };

    $scope.getProjects();
    UsersStats.getUsersStats($scope.date).success(successStats);


}]);
