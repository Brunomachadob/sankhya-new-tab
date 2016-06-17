angular
  .module('SnkNewTab')
  .directive('desktopWidget', ['$injector', 'AngularUtils', function($injector, AngularUtils) {
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
              if (!scope.widgetMd) {
                throw new Error('dashWidget sem metadados');
              }

              if (!scope.widgetMd.name) {
                throw new Error('dashWidget sem nome de widget');
              }

              widgetName = scope.widgetMd.name;
              widgetData = scope.widgetMd.data;

              if (!$injector.has(widgetName + 'Directive')) {
                throw new Error('Widget \'' + widgetName + '\' não disponível.')
              }
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
