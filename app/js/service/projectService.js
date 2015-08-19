'use strict';

services
    .factory('Project', function ($resource, SERVER_URL) {
        return $resource(SERVER_URL + '/project/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('changeStatusProject', function ($rootScope, SERVER_URL, $http) {
        return {
            changeToNewStatus: function (id, newStatus) {
                return $http.put(SERVER_URL + '/project/changestatus/' + id, '"'+ newStatus + '"')
            }
        };
    })
    .factory('detailUpdateProject', function($rootScope, SERVER_URL, $http){
        return{
            detailUpdate: function(id, project){
                return $http.put(SERVER_URL + '/project/detailupdate/' + id, project)
            }
        };
    })
