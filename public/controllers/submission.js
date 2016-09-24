angular.module('app').controller('submissionCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore', '$location', '$routeParams',
 function($scope, $rootScope, $http, Base64, $cookieStore, $location, $routeParams) {
    var lensReview = $routeParams.lens;
    $scope.data = {};
    $scope.data.blogPostData = {};
    $http({
        method: 'GET',
        url: "http://knowyourglass.com/api/pages/" + lensReview,
    }).then(function successCallback(response) {
        $scope.data.blogPostData  = response.data.data[0];
    }, function errorCallback(response) {
        return("Failed to make transaction with database.");
    });

    $scope.interface = {};
    $scope.$on('$dropletReady', function whenDropletReady() {
        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
        $scope.interface.setRequestUrl('/api/upload');
        $scope.interface.defineHTTPSuccess([/2.{2}/]);
        $scope.interface.useArray(true);
    });
    // Listen for when the files have been successfully uploaded.
    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
        alert('Success!');
    });
    // Listen for when the files have failed to upload.
    $scope.$on('$dropletError', function onDropletError(event, response) {
        alert('Fail!');
    });

    $scope.data.starRatings = [
      {id: 'onestar.jpg', name: 'One Star'},
      {id: 'twostar.jpg', name: 'Two Stars'},
      {id: 'threestar.jpg', name: 'Three Stars'},
      {id: 'fourstar.jpg', name: 'Four Stars'},
      {id: 'fivestar.jpg', name: 'Five Stars'},
      {id: 'sixstar.jpg', name: 'Six Star'},
      {id: 'sevenstar.jpg', name: 'Seven Stars'},
      {id: 'eightstar.jpg', name: 'Eight Stars'},
      {id: 'ninestar.jpg', name: 'Nine Stars'},
      {id: 'tenstar.jpg', name: 'Ten Stars'}
    ];
    $scope.data.brandList = [
      {name: 'Canon'},
      {name: 'Nikon'},
      {name: 'Sigma'}
    ];
    $scope.data.catagoryList = [
      {name: 'Wide Angle'},
      {name: 'Normal'},
    ];
}])
