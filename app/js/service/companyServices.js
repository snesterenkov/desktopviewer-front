'use strict';

services
    .factory('Company', function ($resource, SERVER_URL) {
        return $resource(SERVER_URL + '/company/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('changeStatus', function ($rootScope, SERVER_URL, $http) {
        return {
            changeToNewStatus: function (id, newStatus) {
                return $http.put(SERVER_URL + '/company/changestatus/' + id, '"'+ newStatus + '"')
            }
        };
    });