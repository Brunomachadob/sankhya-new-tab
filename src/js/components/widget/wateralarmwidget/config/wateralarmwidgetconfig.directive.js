angular
  .module('SnkNewTab.widgets')
  .directive('waterAlarmWidgetConfig', [function() {
      return {
          restrict: 'E',
          templateUrl: 'js/components/widget/wateralarmwidget/config/wateralarmwidgetconfig.tpl.html',
          scope: {
            data: '='
          }
      };
   }]);
