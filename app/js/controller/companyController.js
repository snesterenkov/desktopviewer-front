'use strict';

app.controller('CompanyController',['$injector','$scope', 'Company', 'changeStatusCompany', function($injector, $scope, Company, changeStatusCompany) {

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
}]);