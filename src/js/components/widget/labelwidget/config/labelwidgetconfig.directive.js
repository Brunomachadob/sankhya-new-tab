angular
  .module('SnkNewTab.widgets')
  .directive('labelWidgetConfig', [function() {
      return {
          restrict: 'E',
          templateUrl: 'js/components/widget/labelwidget/config/labelwidgetconfig.tpl.html',
          controller: 'LabelWidgetConfigController',
          scope: {
            data: '='
          }
      };
   }]);
