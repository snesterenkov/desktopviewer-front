'use strict';

app.controller('ProjectController', ['$injector', '$scope', 'Project', 'freeUsers', 'changeStatusProject', 'openDepartment', function($injector, $scope, Project, freeUsers, changeStatusProject, openDepartment) {

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

    $scope.editProjectMembers = function(project){
        $scope.selectedProject = project;
        var successFindFreeUsers = function (users) {
            $scope.freeUsers = users;
        };
        freeUsers.getFreeUsers(project.id).success(successFindFreeUsers);
    }

    $scope.clearAddList = function(){
        $scope.usersForAdd = {};
    }

    $scope.getProjectItemForUpdate = function(item){
        $scope.getItemForUpdate(item);
        var successOpenDepartment = function (departments) {
            $scope.openDepartmentItems = departments;
        };
        openDepartment.openDepartment().success(successOpenDepartment);
    }

    $scope.addUserToAddList = function(user){
        if($scope.usersForAdd[user.id]){
            delete $scope.usersForAdd[user.id];
        } else{
            $scope.usersForAdd[user.id] = user;
        }
    }

    $scope.addUsersToProject = function(){
        $scope.clearAddList();
    }

    $scope.selectedProject = {};
    $scope.usersForAdd = {};
    $scope.usersForDelete = {};
}]);