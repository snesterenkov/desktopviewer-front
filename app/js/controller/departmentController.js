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
        $scope.selectCompany = null;
        $scope.openCompanyItems = null;
        var successOpenCompany = function (companys) {
            $scope.openCompanyItems = companys;
            for (var index = 0; index < $scope.openCompanyItems.length; index++) {
                if( $scope.currentItem.companyid == $scope.openCompanyItems[index].id){
                    $scope.selectCompany =  $scope.openCompanyItems[index];
                }
            }
            if($scope.selectCompany == null){
                var i = 0;
            }
        };
        openCompany.openCompany().success(successOpenCompany);
    }
};