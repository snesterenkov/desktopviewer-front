'use strict';

var LoginController = function($location,$injector, $scope, $rootScope, $http, SERVER_URL) {

    var successAuthorizedUrl = 'user';
    var url = '/user/authorized';

    $scope.authorized = function(login,password) {
          window.sessionStorage.client = login;
          window.sessionStorage.password = password;

          $http.get(SERVER_URL + url, {
                 params: {
                     login:login
                 }
              }
          ).success(function(authorizedUser){
               $scope.$evalAsync(successAuthorized(authorizedUser));
          }).error(function(){

          });
    };

    function successAuthorized(authorizedUser) {
        $rootScope.authorizedUser = authorizedUser;
        $location.path(successAuthorizedUrl);
    }
}
