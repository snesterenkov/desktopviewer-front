directives.directive('topMenu', function ($rootScope,authorization) {
    return {
        link: function (scope, element, attrs) {
            login(scope,authorization);
            $rootScope.$on('successAuthorizedEvent', function()
            {
               login(scope,authorization)
            });
        },
        templateUrl: 'layout/template/menu.html',
        restrict: 'E',
        scope: {},
        controller: LogoutController
    }
});

 function login(scope,authorization){
     scope.isLoggedIn = authorization.isLoggedIn();
     scope.authorizedUser = window.localStorage.client;
 }