'use strict';

var ProjectController = function($injector, $scope, Project, changeStatusProject, openDepartment) {

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
    }
};