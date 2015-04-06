'use strict';

services
    .factory('users', function ($rootScope, SERVER_URL, $http) {
        return {
            getUsers: function () {
                return $http.get(SERVER_URL + '/user'
                );
            }
        };
    })
    .factory('User', function ($resource, SERVER_URL) {
        return $resource(SERVER_URL + '/user/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    });
