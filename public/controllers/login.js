app.controller('loginCtrl',
    ['$scope', '$rootScope', '$location', 'authenticationService',
    function ($scope, $rootScope, $location, authenticationService) {
        // reset login status
        authenticationService.ClearCredentials();
        $scope.login = function () {
            $scope.dataLoading = true;
            authenticationService.Login($scope.username, $scope.password, function(response) {
                if(response) {
                    authenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/admin');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);

