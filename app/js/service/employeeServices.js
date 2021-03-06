'use strict';

services
    .factory('ClientCompanies', function($rootScope, SERVER_URL, $http) {
        return {
            getCompanies: function() {
                return $http.get(SERVER_URL + '/company');
            }
        };
    })
    .factory('ClientDepartments', function($rootScope, SERVER_URL, $http) {
        return {
            getDepartments: function() {
                return $http.get(SERVER_URL + '/department');
            }
        };
    })
    .factory('ClientProjects', function($rootScope, SERVER_URL, $http) {
        return {
            getProjects: function() {
                return $http.get(SERVER_URL + '/project');
            }
        };
    })
    .factory('UsersStats', function($rootScope, SERVER_URL, $http) {
        return {
            getUsersStats: function(date) {
                return $http.get(SERVER_URL + '/snapshot/user/stats/date',{
                    params: {
                        date : date
                    }
                });
            }
        };
    });
