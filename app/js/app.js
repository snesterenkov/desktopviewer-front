'use strict';

var app = angular.module('app', ['ngRoute', 'app.services', 'app.directives']);
var services = angular.module('app.services', ['ngResource']);
var directives = angular.module('app.directives', ['ngResource']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.when('/user', {
        templateUrl: 'layout/user/user.html',
        controller: UserController
    })
        .when('/registration', {
            templateUrl: 'layout/user/registration.html',
            controller: RegistrationUserController
        })
        .when('/login', {
            templateUrl: 'layout/login.html',
            controller: LoginController
        })
        .when('/logout', {
            templateUrl: 'layout/logout.html',
            controller: LogoutController
        })
        .when('/editProfile', {
            templateUrl: 'layout/user/editProfile.html'

        })
        .when('/company', {
            templateUrl: 'layout/companystructure/company/company.html',
            controller: CompanyController
        })
        .when('/department', {
            templateUrl: 'layout/companystructure/department/department.html',
            controller: DepartemntController
        })
        .otherwise({redirectTo: '/'});

    $httpProvider.interceptors.push('authInjector');
    $httpProvider.interceptors.push('errorInterceptor');
}]);

app.run(['$rootScope', '$location', 'authorization', function ($rootScope, $location, authorization) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!authorization.isLoggedIn() && next.originalPath != '/registration')
            $location.path('/login');
    });
}]);

