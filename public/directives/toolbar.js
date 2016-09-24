angular.module('app').directive("toolbar", function() {
  return {
    restrict: 'E',
    templateUrl: 'views/toolbar.html',
    scope: true,
    transclude : false,
    controller: 'toolbarCtrl'
  };
})

