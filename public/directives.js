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

app.directive('postDate', function() {
	return {
      link: function (scope, el, attrs, formCtrl) {
        // find the text box element, which has the 'name' attribute
        var inputEl = el[0].querySelector("[postDate]");
        // convert the native text box element to an angular element
        var inputNgEl = angular.element(inputEl);
        // get the name on the text box so we know the property to check
        // on the form controller
        var inputName = inputNgEl.attr('postDate');

        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        })
      }
    }
});
