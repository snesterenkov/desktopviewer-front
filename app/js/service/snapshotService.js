/**
 * Created by alex on 20.12.2014.
 */

'use strict';

services
    .factory('snapshots', function ($rootScope, SERVER_URL, $http) {
        return {
            snapshotsByUserAndDate: function (id, date) {
                return $http.get(SERVER_URL + '/snapshot/user/snapshots/date/' + id,
                    {
                        params: {
                            date: date
                        }
                    }
                );
            }
        };
    });
