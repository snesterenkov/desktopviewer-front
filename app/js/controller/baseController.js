var BaseController = function($scope,Service) {

    $scope.fetchItemList = function() {
        $scope.items = Service.query();
    };

    $scope.saveNewItem = function(callback) {
        $scope.currentItem.$save(function(){
            $scope.saveMode = false;
        });
    };

    $scope.deleteItem = function(item, callback) {
        item.$delete(function(){
            callback();
        });
    };

    $scope.createNewItem = function(){
        $scope.currentItem = new Service();
        $scope.saveMode = true;
    };

    $scope.cancel = function(){
        $scope.currentItem = null;
        $scope.saveMode = false;
        $scope.updateMode = false;
    };

    $scope.getItemForUpdate = function(item){
        $scope.currentItem = item;
        $scope.updateMode = true;
    };

    $scope.updateItem = function(callback){
        $scope.currentItem.$update(function(){
            $scope.updateMode = false;
            callback();
        });
    };
}
