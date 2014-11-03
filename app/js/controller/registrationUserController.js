'use strict';

var RegistrationUserController = function($injector, $scope, User){

    $injector.invoke(BaseController, this, {
        $scope: $scope,
        Service : User
    });

    $scope.createNewItem();
    $scope.registrationSuccess = false;
    $scope.passConfirmed = false;
    $scope.isLoginExists = false;
    $scope.validated = false;

    $scope.submitRegistration = function(){
        $scope.validateRegistration();
        $scope.validateSubmittedPassword();
        if($scope.validated && $scope.passConfirmed) {
            $scope.saveNewItem();
            $scope.registrationSuccess = true;
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
}