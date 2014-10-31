'use strict';

var LoginController = function($location,$injector, $scope, $rootScope, $http, SERVER_URL) {

    var successAuthorizedUrl = 'user';

    $scope.authorized = function(login) {
          window.sessionStorage.client = login;

          $http.get(SERVER_URL + '/user/authorized', {
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
