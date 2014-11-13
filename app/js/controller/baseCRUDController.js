var BaseController = function($scope,Service) {

    $scope.fetchItemList = function() {
        $scope.items = Service.query();
    };

    $scope.saveNewItem = function() {
        $scope.currentItem.$save(function(){
            $scope.fetchItemList();
            $scope.saveMode = false;
            $scope.currentItem = null;
        });
    };

    $scope.deleteItem = function(item) {
        item.$delete(function(){
            $scope.fetchItemList();
        });
    };

    $scope.createNewItem = function(){
        $scope.currentItem = new Service();
        $scope.saveMode = true;
        $scope.updateMode = false;
    };

    $scope.cancel = function(){
        $scope.fetchItemList();
        $scope.currentItem = null;
        $scope.saveMode = false;
        $scope.updateMode = false;
    };

    $scope.getItemForUpdate = function(item){
        $scope.currentItem = item;
        $scope.updateMode = true;
        $scope.saveMode = false;
    };

    $scope.updateItem = function(){
        $scope.currentItem.$update(function(){
            $scope.fetchItemList();
            $scope.updateMode = false;
            $scope.currentItem = null;
        });
    };

    $scope.fetchItemList();
}
