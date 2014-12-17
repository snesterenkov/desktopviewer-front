'use strict';

var LoginController = function ($location, $injector, $scope, $rootScope, authorization, CLIENT_URL) {


    var successAuthorizedUrl = 'user';
    var url = '/user/authorized';

    $scope.authorized = function (login, password) {
        window.localStorage.client = login;
        window.localStorage.password = password;

        var success = function (user) {
            $location.path(successAuthorizedUrl);
            $rootScope.$broadcast('successAuthorizedEvent',user);
        };

        var error = function (error) {
            window.localStorage.removeItem('client');
            window.localStorage.removeItem('password');

            $scope.loginForm.$setValidity("accessDenied",false);
        };

        authorization.login(url,login).success(success).error(error);

    };

    $scope.oAuthAuthorized = function () {
        var client_id = "222465284914-ncbces2jtdiv873g8akq1fsci2e4ebue.apps.googleusercontent.com";
        var scope = "email";
        var redirect_uri = CLIENT_URL+"/app/";
        var response_type = "token";
        var googleAuthUrl = "https://accounts.google.com/o/oauth2/auth?scope=" + scope + "&client_id=" + client_id + "&redirect_uri=" + redirect_uri +
            "&response_type=" + response_type;
        window.location.replace(googleAuthUrl);
    }

}
