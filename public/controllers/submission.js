angular.module('app').controller('submissionCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore', '$location', '$routeParams',
 function($scope, $rootScope, $http, Base64, $cookieStore, $location, $routeParams) {
    var lensReview = $routeParams.lens;
    $scope.data = {};
    $scope.data.formData = {
        pictures: [],
        pageParagraphsIndex: []
    };
    $scope.data.newData = {
        image: '',
        pictures: [],
        picture_descriptions: [],
        page_paragraphs: ['']
    };

    $scope.interface = {};
    $scope.$on('$dropletReady', function whenDropletReady() {
        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
        $scope.interface.setRequestUrl('/api/upload');
        $scope.interface.defineHTTPSuccess([/2.{2}/]);
        $scope.interface.useArray(true);
    });
    // Listen for when the files have been successfully uploaded.
    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
    });
    // Listen for when the files have failed to upload.
    $scope.$on('$dropletError', function onDropletError(event, response) {
    });

    $scope.data.formData.starRatings = [
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
    $scope.data.formData.brandList = [
      {name: 'Canon'},
      {name: 'Nikon'},
      {name: 'Sigma'}
    ];
    $scope.data.formData.categoryList = [
      {name: 'Wide Angle'},
      {name: 'Normal'},
    ];
    var blogPost = function() {
       $http({
            method: 'POST',
            url: "/api/pages",
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.data.newData
        }).then(function successCallback(response) {
            $location.path('#/admin');
        }, function errorCallback(response) {
            return("Failed to make transaction with database.");
        });
    };

    $scope.saveBlogPost = function() {
        var authdata = Base64.decode($cookieStore.get('globals').currentUser.authdata);
        var auth = authdata.split(":");
        $scope.data.newData.username = auth[0];
        $scope.data.newData.password = auth[1];
        blogPost($scope.data.newData);
    };
	$scope.addMoreText = function() {
		$scope.data.formData.pageParagraphsIndex.push("");
	};
	$scope.removeMoreText = function() {
		$scope.data.formData.pageParagraphsIndex.pop("");
	};
    $scope.removeDroppedFile = function(index) {
        $scope.data.newData.pictures.splice(index, 1);
    }
    $scope.fileDropped = function(file) {
        if($scope.data.newData.image) {
            $scope.data.newData.pictures.push(file.file.name);
        } else {
            $scope.data.newData.image = file.file.name;
        }
        $scope.interface.uploadFiles();
    };
}])
