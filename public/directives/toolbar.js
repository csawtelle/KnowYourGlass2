angular.module('app').directive("toolbar", function() {
  return {
    restrict: 'E',
    templateUrl: 'views/toolbar.html',
    scope: true,
    transclude : false,
    controller: 'toolbarCtrl'
  };
});


angular.module('app').directive("latestposts", function(){
    return {
    restrict: 'E',
    templateUrl: 'views/latest-posts.html',
    scope:true,
    transclude: false,
    controller: 'latestPostsCtrl'
    };
});
