angular.module('app').controller('toolbarCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

}]);
angular.module('app').controller('latestPostsCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

}]);

angular.module('app').controller('TabController', function(){
    this.tab = 0;
    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
});
