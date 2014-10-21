'use strict';

services
    .factory('User', function ($resource, SERVER_URL) {
        return $resource(SERVER_URL + '/user/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })