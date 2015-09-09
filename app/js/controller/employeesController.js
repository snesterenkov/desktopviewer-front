'use strict';

app.controller('EmployeesController',['$injector','$scope', 'ClientCompanies', 'ClientDepartments', 'ClientProjects', function($injector,
                                                                                                                               $scope, ClientCompanies, ClientDepartments, ClientProjects) {

    $scope.users = {};
    $scope.date = moment(new Date()).format('YYYY-MM-DD');

    $scope.getProjects = function() {
        var successGetProjects = function(projects) {
            $scope.projects = projects;
            $scope.allProjects = [].concat(projects);
            $scope.filterUsers();
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

    $scope.getProjects();
    $scope.getCompanies();

}]);
