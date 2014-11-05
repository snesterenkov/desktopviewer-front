services.factory('errorInterceptor', function($q,$location) {

    var login = 'login';

    return {
        'responseError': function(rejection) {
            if(rejection.status == 401) {
               $location.path(login);
            }
            return $q.reject(rejection);
        }
    };
});
