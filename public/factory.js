angular.module('app')
    .factory('reviewFactory', ['$http', function($http) {

    var reviewFactory = {};
    var url = "/api/pages/"

    reviewFactory.getReview = function (id) {
        return $http.get(url + id);
    };


    reviewFactory.getReviews = function () {
        return $http.get(url);
    };

    return reviewFactory; 
}]);
