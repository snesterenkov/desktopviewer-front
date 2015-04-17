/**
 * Created by human on 06.04.2015.
 */
'use strict';

app.controller('ProjectsCurrentUserController',['$scope','projectTransfer','user_projects','changeStatusProject','changeStatusDepartment','changeStatusCompany',function($scope, projectTransfer,user_projects, changeStatusProject, changeStatusDepartment, changeStatusCompany){

    function saveItems(items){
        $scope.savedCompanies = items.companiesDetailsDTO.slice();
        $scope.savedDepartments = items.departmentDetailsDTOs.slice();
        $scope.savedProjects = items.projectDTOs.slice();
        $scope.savedIsProjectOwner = items.isProjectOwner.slice();
    }

    function prepareProjectsToView(){
        $scope.userProjects = [];
        for(var i = 0; i < $scope.savedProjects.length; i++){
            var item = {};
            item.project = $scope.savedProjects[i];
            item.isOwner = $scope.savedIsProjectOwner[i];
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

    $scope.changeProjectStatus = function(project, newstatus){
        var success = function (changedProject) {
            $scope.getProjects();
        };
        changeStatusProject.changeToNewStatus(project.id,newstatus).success(success);
    }

    $scope.changeDepartmentStatus = function(department, newstatus){
        var success = function(changedDepartment){
            $scope.getProjects();
        }
        changeStatusDepartment.changeToNewStatus(department.id, newstatus).success(success);
    }

    $scope.changeCompanyStatus = function(company, newstatus){
        var success = function(changedCompany){
            $scope.getProjects();
        }
        changeStatusCompany.changeToNewStatus(company.id, newstatus).success(success);
    }

    $scope.sendUserProject = function(item){
        projectTransfer.setUserProject(item.company, item.department, item.project);
    }

    $scope.getProjects();
}]);