'use strict';

services
    .factory('authInjector', function (SERVER_URL) {
        var authInjector = {
            request: function (config) {
                if (config.url.indexOf(SERVER_URL) != -1) {
                    var url = config.url.replace(SERVER_URL, "");
                    var params = {};
                    if (config.params != undefined)
                        params = config.params;
                    else
                        config.params = params;
                    params['client'] = window.localStorage.client;
                    if(window.localStorage.client != undefined)
                        params['signature'] = createSignature(url, params).toString();
                }
                return config;
            }
        };
        return authInjector;
    })
    .factory('authorization', function ($rootScope,SERVER_URL,$http) {
        return {
            login: function (url, login) {
                return $http.get(SERVER_URL + url, {
                        params: {
                            login: login
                        }
                    }
                )
            } ,
            isLoggedIn: function() {
                if(window.localStorage.client != undefined && window.localStorage.password != undefined)
                    return true;
                else
                    return false;
            }
        };
    });

    function createSignature(url, params) {
        var paramNameArrays = [];
        for (var key in params) {
            paramNameArrays.push(key);
        }
        var signature = window.localStorage.password + ':' + url;
        paramNameArrays.sort();
        paramNameArrays.forEach(function (entry) {
            signature = signature + ":" + entry + ":" + params[entry];
        });
        return CryptoJS.SHA1(signature);
    }

