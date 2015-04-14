services
    .factory('workDiaryService', function (SERVER_URL, $http) {
        return {
            getHoursByUserFromPeriod: function (projects,period, startDate, endDate) {
                return $http.post(SERVER_URL + '/report/workDiary?period=' + period +'&startDate='+startDate+'&endDate='+endDate,
                    {
                        projectDTOs: projects
                    }
                );
            }
        };
    });
