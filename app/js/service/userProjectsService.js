/**
 * Created by human on 07.04.2015.
 */
'use strict';

services
    .factory('user_projects', function(SERVER_URL, $http){
        return{
            getUserProjects: function(){
                return $http.get(SERVER_URL + '/user_projects',{
                    params:{
                        client: window.localStorage.client
                    }
                });
            }
        };
    });