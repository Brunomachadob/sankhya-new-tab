angular
  .module('SnkNewTab')
  .directive('desktopWidget', ['$controller', 'AngularUtils', 'WidgetService', function($controller, AngularUtils, WidgetService) {
      return {
          restrict: 'E',
          require: '^desktop',
          templateUrl: 'js/components/desktop/desktopwidget/desktopwidget.tpl.html',
          scope: {
            widgetMd: '='
          },
          link: function(scope, element, attr, desktopCtrl) {
            init();

            function init() {
              scope.ctrl = $controller('DesktopWidgetController', {
                $scope: scope,
                $element: element,
                $attr: attr,
                desktopCtrl: desktopCtrl
              });

              var widget = getWidget();
              element.find('.widget-container').append(widget);
            }

            function getWidget() {
              var widgetName;
              var widgetData;

              try {
                WidgetService.validateWidgetMD(scope.widgetMd);

                widgetName = scope.widgetMd.name;

                WidgetService.ensureWidgetExists(widgetName);

                widgetName = AngularUtils.toDashCase(widgetName);
                return AngularUtils.createDirective(widgetName, {'data': 'widgetMd.data'}, scope.$new());
              } catch(error) {
                scope.error = error;
                return AngularUtils.createDirective('desktopWidgetError', {'data': 'error'}, scope.$new());
              }
            }
          }
      };

   }]);
