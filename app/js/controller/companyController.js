'use strict';

var CompanyController = function($injector, $scope, Company, changeStatusCompany) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: Company
    });

    $scope.changeStatusController = function(id, newstatus) {

        var success = function (user) {
            $scope.fetchItemList();
        };

        changeStatusCompany.changeToNewStatus(id,newstatus).success(success);
    };
};