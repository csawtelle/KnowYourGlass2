angular.module('app', ['ngRoute'])

.factory('testFactory', ['$http', '$rootScope',  function testFactory($http, $rootScope) {
    return testFactory;
}])

.controller('appCtrl', ['$scope', function($scope) {

}])

.controller('toolbarCtrl', [
    '$scope', '$rootScope',  '$http', 'testFactory',
    function($scope, $rootScope, $http, testFactory) {
    $scope.data = testFactory;
}])

.directive("toolbar", function() {
  return {
    restrict: 'A',
    templateUrl: 'views/toolbar.html',
    scope: true,
    transclude : false,
    controller: 'toolbarCtrl'
  };
})

