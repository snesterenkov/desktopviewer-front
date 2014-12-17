'use strict';

var ProfileController = function($scope, $rootScope, authorization, User) {

    var url = '/user/authorized';

    $scope.updatedSuccess = false;

    $rootScope.$on('successAuthorizedEvent', function(event,user)
    {
        $scope.currentUser = user;
    });

    $scope.updateItem = function(){
        User.update($scope.currentUser);
        $scope.updatedSuccess = true;
    };

    $scope.cancel = function(){
        $scope.updatedSuccess = false;
    };
}
