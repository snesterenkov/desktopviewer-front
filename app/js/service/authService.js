services
    .factory('authInjector', function (SERVER_URL) {
        var authInjector = {
            request: function (config) {
                if (config.url.contains(SERVER_URL))
                    config.url = config.url + '?client=' + window.sessionStorage.client;
                return config;
            }
        };
        return authInjector;
    });

