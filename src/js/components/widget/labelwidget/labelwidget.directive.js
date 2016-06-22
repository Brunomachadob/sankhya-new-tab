angular
  .module('SnkNewTab.widgets')
  .directive('labelWidget', [function() {
      return {
          restrict: 'E',
          templateUrl: 'js/components/widget/labelwidget/labelwidget.tpl.html',
          scope: {
            data: '='
          }
      };
   }]);
