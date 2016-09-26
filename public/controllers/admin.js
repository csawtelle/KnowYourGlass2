angular.module('app').controller('adminCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore', '$window', '$location',
  function($scope, $rootScope, $http, Base64, $cookieStore, $window, $location) {
        $scope.data = {};
        $scope.data.pageList = {};

        //test for star ratings
        $scope.data.starRatings = [
          {id: 'rating0', name: 'Zero Star'},
          {id: 'rating1', name: 'One Star'},
          {id: 'rating2', name: 'Two Stars'},
          {id: 'rating3', name: 'Three Stars'},
          {id: 'rating4', name: 'Four Stars'},
          {id: 'rating5', name: 'Five Stars'},
          {id: 'rating6', name: 'Six Star'},
          {id: 'rating7', name: 'Seven Stars'},
          {id: 'rating8', name: 'Eight Stars'},
          {id: 'rating9', name: 'Nine Stars'},
          {id: 'rating10', name: 'Ten Stars'}
        ];
        $scope.data.starRating = '';     

        $http({
            method: 'GET',
            url: "http://knowyourglass.com/api/pages",
        }).then(function successCallback(response) {
            $scope.data.pageList = response.data.data;
        }, function errorCallback(response) {
            return("Failed to make transaction with database.");
        });
        $scope.data.deletePost = function(name) {
           $http({
                method: 'DELETE',
                url: "http://knowyourglass.com/api/pages/" + name
            }).then(function successCallback(response) {
                $window.location.reload();
            }, function errorCallback(response) {
                return("Failed to make transaction with database.");
            });
        };
        $scope.data.editPost = function(name) {
            $window.location.href = '/#/admin/create/' + name;
        };
}])

