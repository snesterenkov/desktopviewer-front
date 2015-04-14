'use strict';

var app = angular.module('app', ['ngRoute', 'app.services', 'app.directives',"ui.bootstrap",'pascalprecht.translate','ui.bootstrap.datetimepicker']);
var services = angular.module('app.services', ['ngResource']);
var directives = angular.module('app.directives', ['ngResource']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.when('/user', {
        templateUrl: 'layout/user/user.html',
        controller: 'UserController'
    })
        .when('/registration', {
            templateUrl: 'layout/user/registration.html',
            controller: 'RegistrationUserController'
        })
        .when('/login', {
            templateUrl: 'layout/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            templateUrl: 'layout/logout.html',
            controller: 'LogoutController'
        })
        .when('/editProfile', {
            templateUrl: 'layout/user/editProfile.html'
        })
        .when('/company', {
            templateUrl: 'layout/companystructure/company/company.html',
            controller: 'CompanyController'
        })
        .when('/department', {
            templateUrl: 'layout/companystructure/department/department.html',
            controller: 'DepartmentController'
        }).when('/project', {
            templateUrl: 'layout/companystructure/project/project.html',
            controller: 'ProjectController'
        })
        .when('/snapshots', {
            templateUrl: 'layout/snapshot/snapshotsView.html',
            controller: 'SnapshotController'
        })
        .when('/dashboard', {
            templateUrl: 'layout/user/report/dashboard.html',
            params: {
                user: window.localStorage.client
            },
            controller: 'SnapshotsCurrentUserController'
        })
        .when('/workDiary', {
            templateUrl: 'layout/user/report/workDiary.html',
            controller: 'WorkDiaryController'
        })
        .when('/userProjects', {
            templateUrl: 'layout/user/userProjects/userProjects.html',
            controller: 'ProjectsCurrentUserController'
        })
        .otherwise({redirectTo: '/login'});

    $httpProvider.interceptors.push('authInjector');
    $httpProvider.interceptors.push('errorInterceptor');

}]);

app.run(['$rootScope', '$location', 'authorization', '$q', '$http', function ($rootScope, $location, authorization,$q, $http) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!authorization.isLoggedIn()  && next.originalPath != '/registration')
            $location.path('/login');
    });

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        var URL = $location.path();
        var GOOGLE_GET_EMAIL_URL = "https://www.googleapis.com/userinfo/email?alt=json&access_token="
        if (URL.indexOf("access_token") != -1) {
            window.localStorage.token = URL.substring(URL.indexOf("=") + 1, URL.indexOf("&"));
            $http.get(GOOGLE_GET_EMAIL_URL + window.localStorage.token)
                .success(function (result) {
                    var authorizationUrl = '/user/email';

                    var success = function (user) {
                        if(user != "") {
                            window.localStorage.client = user.login;
                            $rootScope.$broadcast('successAuthorizedEvent', user);
                            $location.path('/user');

                        } else {
                            window.localStorage.removeItem('client');
                            window.localStorage.removeItem('token');
                        }
                    };

                    var error = function (error) {
                        window.localStorage.removeItem('client');
                        window.localStorage.removeItem('token');
                        $location.path('/login');
                    };

                    authorization.email(authorizationUrl,result.data.email).success(success).error(error);

                }).error(function (error) {
                    window.localStorage.removeItem('client');
                    window.localStorage.removeItem('token');
                    $location.path('/login');
                });
        }
    });
}]);

