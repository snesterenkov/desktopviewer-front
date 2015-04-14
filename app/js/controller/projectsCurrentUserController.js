/**
 * Created by human on 06.04.2015.
 */
'use strict';

app.controller('ProjectsCurrentUserController',['$scope','user_projects',function($scope, user_projects){

     function saveItems(items){
        $scope.savedCompanies = items.companiesDTO.slice();
        $scope.savedDepartments = items.departmentDTOs.slice();
        $scope.savedProjects = items.projectDTOs.slice();
    }

    function prepareProjectsToView(){
        $scope.userProjects = [];
        for(var i = 0; i < $scope.savedProjects.length; i++){
            var item = {};
            item.project = $scope.savedProjects[i];
            $scope.savedDepartments.forEach(function (value) {
                if (value.id == item.project.departmentId) {
                    item.department = value;
                }
            })
            $scope.savedCompanies.forEach(function (value) {
                if (value.id == item.department.companyId) {
                    item.company = value;
                }
            })
            $scope.userProjects.push(item);
        }
    }

    $scope.filterProjects = function(){
        $scope.filteredUserProjects = $scope.userProjects;
        if($scope.companyItem){
            $scope.filteredUserProjects = $scope.userProjects.filter(function(value){
                return value.company.id == $scope.companyItem.id;
            });
        }
        if($scope.departmentItem){
            $scope.filteredUserProjects = $scope.filteredUserProjects.filter(function(value){
                return value.department.id == $scope.departmentItem.id;
            });
        }
    }

    $scope.getProjects = function(){
        var successProjects = function(items){
            saveItems(items);
            prepareProjectsToView();
            $scope.filterProjects();
        }
        user_projects.getUserProjects().success(successProjects);
    };

    $scope.getProjects();
}]);