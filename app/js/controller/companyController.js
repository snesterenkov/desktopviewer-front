'use strict';

var CompanyController = function($injector, $scope, Company, changeStatus) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: Company
    });

    $scope.changeStatusController = function(id, newstatus) {

        var success = function (user) {
            $scope.fetchItemList();
        };

        changeStatus.changeToNewStatus(id,newstatus).success(success);
    };
}