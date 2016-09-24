angular.module('app').controller('reviewCtrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
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

