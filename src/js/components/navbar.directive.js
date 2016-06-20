angular
  .module('SnkNewTab')
  .directive('navBar', ['$location', function($location) {
      return {
          restrict: 'A',
          link: function(scope, element) {
              var $ul = angular.element(element);
              var $tabs = $ul.children();

              var tabMap = {};

              $tabs.each(function() {
                var $li = angular.element(this);
                //Substring 1 to remove the # at the beginning (because location.path() below does not return the #)
                tabMap[$li.find('a').attr('href').substring(1)] = $li;
              });

              scope.$watch(function () {
                return $location.path();
              }, function(newPath) {
                  $tabs.removeClass("active");
                  if (tabMap[newPath]) {
                    tabMap[newPath].addClass("active");
                  }
              });
          }

      };

   }]);
