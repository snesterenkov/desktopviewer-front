'use strict';

app.controller('RegistrationUserController' ,['$injector', '$scope', 'User', function($injector, $scope, User){

    $scope.currentItem = new User();
    $scope.registrationSuccess = false;
    $scope.passConfirmed = false;
    $scope.isLoginExists = false;
    $scope.validated = false;
    $scope.loginIsExists = false;

    $scope.submitRegistration = function() {
        $scope.validateRegistration();
        $scope.validateSubmittedPassword();
        if ($scope.validated && $scope.passConfirmed) {
            $scope.currentItem.$save(function (value, headers) {
                $scope.loginIsExists = false;
                $scope.registrationSuccess = true;
                $scope.currentItem = value;
            }, function (response) {
                $scope.loginIsExists = true;
            });
        }
    };

    $scope.validateSubmittedPassword = function(){
        $scope.passConfirmed = $scope.currentItem.password == $scope.passwordRepeat;
    };

    $scope.validateRegistration = function(){
        $scope.validated = true;
        if($scope.currentItem.firstName == null || $scope.currentItem.firstName == ''){
            $scope.validated = false;
        }
        if($scope.currentItem.lastName == null || $scope.currentItem.lastName == ''){
            $scope.validated = false;
        }
        if($scope.currentItem.email == null || $scope.currentItem.email == ''){
            $scope.validated = false;
        }
        if($scope.currentItem.password == null || $scope.currentItem.password == ''){
            $scope.validated = false;
        }
        if($scope.currentItem.login == null || $scope.currentItem.login == ''){
            $scope.validated = false;
        }
    }

    var error = function(){
        $scope.loginIsExists = true;
        $scope.registrationSuccess = true;
    }

    var success = function(){
        $scope.loginIsExists = false;
    }
}])