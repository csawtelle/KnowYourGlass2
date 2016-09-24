angular.module('app').factory('authenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        service.Login = function (username, password, callback) {
            $http.post('/api/login', { username: username, password: password })
                .success(function (response) {
                    callback(response);
                });
        };
        service.SetCredentials = function (username, password) {
           var authdata = Base64.encode(username + ':' + password);
           $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basici ' + authdata;
            $cookieStore.put('globals', $rootScope.globals);
        };
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
        return service;
    }])
