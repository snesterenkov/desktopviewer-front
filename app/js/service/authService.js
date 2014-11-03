

services
    .factory('authInjector', function (SERVER_URL) {
        var authInjector = {
            request: function (config) {
                if (config.url.contains(SERVER_URL))
                {
                    var url = config.url.replace(SERVER_URL,"");
                    var params = {};
                    if(config.params != undefined)
                        params = config.params;
                    params['client'] = window.sessionStorage.client;
                    params['signature'] = createSignature(url,params).toString();
                }
                return config;
            }
        };
        return authInjector;
    });

function createSignature(url,params) {
    var paramNameArrays = [];
    for(key in params) {
        paramNameArrays.push(key);
    }
    var signature = window.sessionStorage.password + ':' + url;
    paramNameArrays.sort();
    paramNameArrays.forEach(function(entry) {
       signature = signature + ":" + entry + ":" + params[entry];
    });
    return CryptoJS.SHA1(signature);
}

