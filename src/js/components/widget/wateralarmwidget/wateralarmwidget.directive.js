angular
  .module('SnkNewTab.widgets')
  .directive('waterAlarmWidget', [function() {
      return {
          restrict: 'E',
          templateUrl: 'js/components/widget/wateralarmwidget/wateralarmwidget.tpl.html',
          controller: 'WaterAlarmWidgetController',
          controllerAs: 'ctrl',
          scope: {
            data: '='
          }
      };
   }]);
