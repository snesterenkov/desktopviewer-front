'use strict';

app.controller('ProjectController', ['$injector', '$scope', 'Project', 'freeUsers',
    'detailUpdateProject', 'changeStatusProject', 'openDepartment', function($injector, $scope, Project, freeUsers, detailUpdateProject, changeStatusProject, openDepartment) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: Project
    });

    $scope.changeStatusProjectController = function(id, newstatus) {
        var success = function (user) {
            $scope.fetchItemList();
        };

        changeStatusProject.changeToNewStatus(id,newstatus).success(success);
    };

    $scope.createProjectNewItem = function(){
        $scope.createNewItem();
        var successOpenDepartment = function (departments) {
            $scope.openDepartmentItems = departments;
        };
        openDepartment.openDepartment().success(successOpenDepartment);
    };

    $scope.getProjectItemForUpdate = function(item){
        $scope.getItemForUpdate(item);
        var successOpenDepartment = function (departments) {
            $scope.openDepartmentItems = departments;
        };
        openDepartment.openDepartment().success(successOpenDepartment);
    };

    $scope.getFreeUsers = function(projectId){
        var successFindFreeUsers = function (users) {
            $scope.freeUsers = users;
        };
        freeUsers.getFreeUsers(projectId).success(successFindFreeUsers);
        };

    $scope.editProjectMembers = function(project){
        $scope.clearAddList();
        $scope.currentItem = project;
        $scope.getFreeUsers($scope.currentItem.id);
    };

    $scope.clearAddList = function(){
        $scope.usersForAdd = {};
    };

    $scope.addUserToAddList = function(user){
        if($scope.usersForAdd[user.id]){
            delete $scope.usersForAdd[user.id];
        } else{
            $scope.usersForAdd[user.id] = user;
        }
    };

    $scope.successDetailUpdate = function(updatedProject){
        $scope.currentItem.name = updatedProject.name;
        $scope.currentItem.departmentId = updatedProject.departmentId;
        $scope.currentItem.departmentDTO = updatedProject.departmentDTO;
        $scope.currentItem.userDTOs = updatedProject.userDTOs;
        $scope.getFreeUsers($scope.currentItem.id);
    };

    $scope.addUsersToProject = function(){
        var updateItem = angular.copy($scope.currentItem);
        for(var key in $scope.usersForAdd){
            updateItem.userDTOs.push(angular.copy($scope.usersForAdd[key]));
        }
        detailUpdateProject.detailUpdate(updateItem.id, updateItem).success($scope.successDetailUpdate);
    };

    $scope.removeUserFromProject = function(userId){
        var updateItem = angular.copy($scope.currentItem);
        updateItem.userDTOs = [];
        $scope.currentItem.userDTOs.forEach(function(value, index){
            if(value.id != userId){
                updateItem.userDTOs.push(value);
            }
        });
        console.log(updateItem);
        detailUpdateProject.detailUpdate(updateItem.id, updateItem).success($scope.successDetailUpdate);
    };

    $scope.currentItem = {};
    $scope.usersForAdd = {};
    $scope.usersForDelete = {};
}]);