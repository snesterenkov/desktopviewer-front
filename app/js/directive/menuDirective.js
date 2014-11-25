directives.directive('topMenu', function ($rootScope,authorization) {
    return {
        link: function (scope, element, attrs) {

            scope.isLoggedIn = authorization.isLoggedIn();
            scope.authorizedUser = window.localStorage.client;;

            $rootScope.$on('successAuthorizedEvent', function(event,user)
            {
                scope.isLoggedIn = authorization.isLoggedIn();
                scope.authorizedUser = user.login;
            });
        },
        templateUrl: 'layout/template/menu.html',
        restrict: 'E',
        scope: {},
        controller: LogoutController
    }
});
