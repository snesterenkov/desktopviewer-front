'user strict';

services
    .factory('transferService', function() {
        var data = {};

        return {
            setField: function(key, value) {
                data[key] = value;
            },
            getField: function(key) {
                return data[key];
            }
        };
    });
