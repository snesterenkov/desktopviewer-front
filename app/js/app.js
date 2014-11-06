'use strict';

var app = angular.module('app', ['ngRoute', 'app.services']);
var services = angular.module('app.services', ['ngResource']);

app.config(['$routeProvider','$httpProvider', function ($routeProvider,$httpProvider) {
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
    .otherwise({redirectTo: '/login'});

    $httpProvider.interceptors.push('authInjector');
    $httpProvider.interceptors.push('errorInterceptor');
}]);

app.run(['$rootScope', '$location', 'authorization', function ($rootScope, $location, authorization) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
       if(!authorization.isLoggedIn())
           $location.path('/login');
    });
}]);

