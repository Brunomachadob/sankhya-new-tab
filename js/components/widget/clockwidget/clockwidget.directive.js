angular
  .module('SnkNewTab')
  .directive('clockWidget', [function() {
      return {
          restrict: 'E',
          templateUrl: 'js/components/widget/clockwidget/clockwidget.tpl.html',
          controller: 'ClockWidgetController',
          controllerAs: 'clockCtrl',
          scope: {
            data: '='
          }
      };

   }]);
