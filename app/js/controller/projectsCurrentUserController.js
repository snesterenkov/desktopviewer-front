/**
 * Created by human on 06.04.2015.
 */
'use strict';

app.controller('ProjectsCurrentUserController',['$scope','user_projects',function($scope, user_projects){

    var getCompaniesList = function(projects){
        var companies = {};
        $scope.companiesList = [];
        for(var i = 0; i< projects.length; i++){
            companies[projects[i].companyDTO.name] = projects[i].companyDTO;
        }
        for(var k in companies){
            $scope.companiesList.push( companies[k]);
        }
    }

    $scope.cancelFilter= function(){
        if(!$scope.companyItem)
            $scope.companyItem = undefined;
        if(!$scope.departmentItem)
            $scope.departmentItem = "";
    }

    $scope.getDepartmentsList = function(companyid){
        $scope.departmentItem = "";
        var departments = {};
        $scope.departmentsList = [];
        for(var i = 0; i<$scope.userProjects.length; i++){
            if($scope.userProjects[i].departmentDTO.companyid === companyid)
                departments[$scope.userProjects[i].departmentDTO.id] = $scope.userProjects[i].departmentDTO.name;
        }
        for(var k in departments){
            $scope.departmentsList.push(departments[k]);
        }
    }

    $scope.getProjects = function(){
        var successProjects = function(projects){
            $scope.userProjects = projects;
            getCompaniesList(projects);
        }
        user_projects.getUserProjects().success(successProjects);
    };

    $scope.departmentItem = "";
    $scope.getProjects();
}]);