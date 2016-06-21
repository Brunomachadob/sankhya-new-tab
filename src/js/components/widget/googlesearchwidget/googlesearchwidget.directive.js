angular
  .module('SnkNewTab.widgets')
  .directive('googleSearchWidget', [function() {
      return {
          restrict: 'E',
          templateUrl: 'js/components/widget/googlesearchwidget/googlesearchwidget.tpl.html',
          scope: {
            data: '='
          }
      };

   }]);
