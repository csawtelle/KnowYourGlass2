angular.module('app').controller('mainCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        $scope.data = {};
        $scope.data.pageList = {};
         
        $http({
            method: 'GET',
            url: "/api/pages",
        }).then(function successCallback(response) {
            $scope.data.pageList = response.data.data;

        }, function errorCallback(response) {
            return("Failed to make transaction with database.");
        });

}])

