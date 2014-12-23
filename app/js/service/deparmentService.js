'use strict';

services
    .factory('Department', function ($resource, SERVER_URL) {
        return $resource(SERVER_URL + '/department/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('changeStatusDepartment', function ($rootScope, SERVER_URL, $http) {
        return {
            changeToNewStatus: function (id, newStatus) {
                return $http.put(SERVER_URL + '/department/changestatus/' + id, '"'+ newStatus + '"')
            }
        };
    })
    .factory('openDepartment', function ($rootScope, SERVER_URL, $http) {
        return {
            openDepartment: function (id, newStatus) {
                return $http.get(SERVER_URL + '/department/open');
            }
        };
    });