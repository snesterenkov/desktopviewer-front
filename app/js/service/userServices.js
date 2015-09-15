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
    })
    .factory('freeUsers', function($rootScope, SERVER_URL, $http){
        return {
            getFreeUsers: function(projectId){
                return $http.get(SERVER_URL + '/user/free',{
                    params:{
                        projectid: projectId
                    }
                });
            }
        };
    })
    .factory('restoreUserPassword', function($rootScope, SERVER_URL, $http){
        return {
            sendLetterOnEmail: function(email){
                return $http.get(SERVER_URL + '/user/requestOnChangingPassword',{
                    params:{
                        email: email
                    }
                });
            }
        };
    })
    .factory('changeUserPassword', function($rootScope, SERVER_URL, $http){
        return {
            change: function(password, token){
                return $http.get(SERVER_URL + '/user/changePassword/' + token,{
                    params:{
                        password: password
                    }
                });
            }
        };
    })
;
