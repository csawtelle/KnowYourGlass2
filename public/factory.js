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

    reviewFactory.updateReview = function (id, data) {
        return $http.put(url + id, data);
    };

    reviewFactory.newReview = function (data) {
        return $http.post(url, data);
    };

    reviewFactory.deleteReview = function (id, data) {
        return $http.delete(url + id, data);
    };

    return reviewFactory; 
}]);
