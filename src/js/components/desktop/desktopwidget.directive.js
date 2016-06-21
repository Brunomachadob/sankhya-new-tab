angular
  .module('SnkNewTab')
  .directive('desktopWidget', ['$injector', 'AngularUtils', 'WidgetService', function($injector, AngularUtils, WidgetService) {
      return {
          restrict: 'E',
          require: '^desktop',
          scope: {
            widgetMd: '='
          },
          link: function(scope, element, attr, dashCtrl) {
            var widgetName;
            var widgetData;

            try {
              WidgetService.validateWidgetMD(scope.widgetMd);

              widgetName = scope.widgetMd.name;
              widgetData = angular.extend({}, scope.widgetMd.defaultData, scope.widgetMd.data);

              WidgetService.ensureWidgetExists(widgetName);
            } catch(error) {
              widgetName = 'desktopWidgetError';
              widgetData = error;
            }

            widgetName = AngularUtils.toDashCase(widgetName);

            scope.widgetData = widgetData;

            var directive = AngularUtils.createDirective(widgetName, {'data': 'widgetData'}, scope.$new());

            element.append(directive);
          }
      };

   }]);
