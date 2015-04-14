filters.filter('projectByCompanyFilter', ['$filter',function ($filter) {
    return function (inputArray, departments, txnType) {
        if (!angular.isDefined(departments) || departments == '') {
            return inputArray;
        }
        var data = [];
        angular.forEach(inputArray, function (item) {
            departments.forEach(function (itemDep) {
                if (item.departmentId == itemDep.id) {
                    data.push(item);
                }
            });
        });
        return data;
    };
}]);

