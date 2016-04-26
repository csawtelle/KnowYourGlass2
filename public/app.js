var app = angular.module('app', [
    'ngRoute',
    'ngCookies'
])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/reviews/:lens?', {
            templateUrl: 'views/reviewsTemplate.html',
            controller: 'reviewCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/submission.html',
            controller: 'submissionCtrl',
            css: 'css/submission.css'
        })
        .otherwise({ redirectTo: '/login' });
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
app.factory('AuthenticationService',
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
app.factory('Base64', function () {
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;
        },
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;
        }
    };
});  
app.controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/admin');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
app.controller('mainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

}])
app.controller('reviewCtrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
    var lensReview = $routeParams.lens;
    var url = "http://knowyourglass.com/api/pages/" + lensReview;
    $scope.blogPostData = {};
    $http({
        method: 'GET',
        url: url,
    }).then(function successCallback(response) {
        $scope.blogPostData = response.data.data[0];
    }, function errorCallback(response) {
        return("Failed to make transaction with database.");
    });

}])
app.controller('submissionCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore',
 function($scope, $rootScope, $http, Base64, $cookieStore) {
    $scope.data = {};
    $scope.data.blogPostData = {};
    $scope.data.starRatings = [
      {id: '1', name: 'One Star'},
      {id: '2', name: 'Two Stars'},
      {id: '3', name: 'Three Stars'},
      {id: '4', name: 'Four Stars'},
      {id: '5', name: 'Five Stars'},
      {id: '6', name: 'Six Star'},
      {id: '7', name: 'Seven Stars'},
      {id: '8', name: 'Eight Stars'},
      {id: '9', name: 'Nine Stars'},
      {id: '10', name: 'Ten Stars'}
    ];
    $scope.data.brandList = [
      {id: '1', name: 'Canon'},
      {id: '2', name: 'Nikon'},
      {id: '3', name: 'Sigma'}
    ];
    $scope.data.catagoryList = [
      {id: '1', name: 'Wide Angle'},
      {id: '2', name: 'Normal'},
      {id: '3', name: 'Telephot'},
      {id: '4', name: 'Macro'}
    ];
    var blogPost = function() {
       $http({
            method: 'POST',
            url: "http://knowyourglass.com/api/pages",
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data.blogPostData
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
            return("Failed to make transaction with database.");
        });
    };

    $scope.saveBlogPost = function() {
        var authdata = Base64.decode($cookieStore.get('globals').currentUser.authdata);
        var auth = authdata.split(":");
        $scope.data.blogPostData.username = auth[0];
        $scope.data.blogPostData.password = auth[1];
        blogPost($scope.data.blogPostData);
    };
}])

