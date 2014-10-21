'use strict';

var app = angular.module('app', ['ngRoute', 'app.services']);
var services = angular.module('app.services', ['ngResource']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: 'layout/user/user.html',
        controller: UserController
    });
    $routeProvider.otherwise({redirectTo: '/user'});
}]);

app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://localhost:8080/user'
    ]);
});


