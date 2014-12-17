'use strict';

var DepartemntController = function($injector, $scope, Department, changeStatusDepartment, openCompany) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: Department
    });

    $scope.changeStatusDepartmentController = function(id, newstatus) {
        var success = function (user) {
            $scope.fetchItemList();
        };

        changeStatusDepartment.changeToNewStatus(id,newstatus).success(success);
    };

    $scope.createDepartmentNewItem = function(){
        $scope.createNewItem();
        var successOpenCompany = function (companys) {
            $scope.openCompanyItems = companys;
        };
        openCompany.openCompany().success(successOpenCompany);
    };

    $scope.getDepartmentItemForUpdate = function(item){
        $scope.getItemForUpdate(item);
        var successOpenCompany = function (companys) {
            $scope.openCompanyItems = companys;
        };
        openCompany.openCompany().success(successOpenCompany);
    }
};