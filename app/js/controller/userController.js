'use strict';

var UserController = function($injector, $scope, User) {

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service: User
    });

    $scope.fetchItemList();

    $scope.updateUser = function(){
        $scope.updateItem(function callback(){
            $scope.fetchItemList();
        });
    } ;

    $scope.deleteUser = function(item){
        $scope.deleteItem(item, function callback(){
            $scope.fetchItemList();
        });
    };

    $scope.saveUser = function(){
        $scope.saveNewItem(function callback(){
            $scope.fetchItemList();
        });
    }
};
