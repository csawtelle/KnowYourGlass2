var app = angular.module('app', [
    'ngRoute',
    'ngDroplet',
    'ngCookies',
])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl' 
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registrationController'
        })
        .when('/success', {
            templateUrl: 'views/success.html',
            controller: 'successController'
        })

        .when('/reviews/:lens?', {
            templateUrl: 'views/reviewsTemplate.html',
            controller: 'reviewCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'adminCtrl',
        })
        .when('/admin/create/:lens?', {
            templateUrl: 'views/submission.html',
            controller: 'submissionCtrl',
        })
        .otherwise({ redirectTo: '/' });
})
app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path().includes('/admin') && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
