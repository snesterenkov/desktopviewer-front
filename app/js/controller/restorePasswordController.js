'use strict';

app.controller('RestorePasswordController',[ '$injector', '$scope', 'restoreUserPassword', 'changeUserPassword', '$routeParams', '$location', function($injector, $scope, restoreUserPassword, changeUserPassword, $routeParams, $location) {

    $scope.isSuccessed = null;

    $scope.requestOnChangingPassword = function(email) {
        restoreUserPassword.sendLetterOnEmail(email).success(successSend);
    }

    var successSend = function (result) {
        $scope.isSuccessed = result;
    };

    $scope.setNewPassword = function(password) {
        $scope.isSuccessed =changeUserPassword.change(password, $routeParams.token).success(successSend);
    }
}])
