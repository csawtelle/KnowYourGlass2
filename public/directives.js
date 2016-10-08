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

app.directive('noRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});
