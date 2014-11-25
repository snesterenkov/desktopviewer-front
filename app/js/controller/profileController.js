'use strict';

var ProfileController = function($scope, $rootScope, authorization, User) {

    var url = '/user/authorized';

    $scope.updatedSuccess = false;

    $rootScope.$on('successAuthorizedEvent', function(event,user)
    {
        $scope.currentUser = user;
    });

    var success = function (data) {
        $scope.currentUser = data;
    };

    authorization.login(url,window.localStorage.client).success(success);

    $scope.updateItem = function(){
        User.update($scope.currentUser);
        $scope.updatedSuccess = true;
    };

    $scope.cancel = function(){
        $scope.updatedSuccess = false;
    };
}
