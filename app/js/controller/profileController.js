'use strict';

var ProfileController = function($scope, authorization, User) {

    var url = '/user/authorized';

    $scope.updatedSuccess = false;


    var success = function (currentUser) {
        $scope.currentItem = currentUser;
    };

    authorization.login(url,window.localStorage.client).success(success);

    $scope.updateItem = function(){
        User.update($scope.currentItem);
        $scope.updatedSuccess = true;
    };
}
