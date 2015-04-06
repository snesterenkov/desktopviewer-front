services
    .factory('workDiary', function (SERVER_URL, $http) {
        return {
            getHoursByUserFromPeriod: function (period, startDate, endDate) {
                return $http.get(SERVER_URL + '/report/workDiary',
                    {
                        params: {
                            period: period,
                            startDate: startDate,
                            endDate: endDate
                        }
                    }
                );
            }
        };
    });
