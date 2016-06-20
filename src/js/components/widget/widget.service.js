angular
  .module('SnkNewTab.widgets')
  .service('WidgetService', ['$injector', function($injector) {
    var self = this;

    self.getLocalWidgets = getLocalWidgets;
    self.validateWidgetMD = validateWidgetMD;
    self.ensureWidgetExists = ensureWidgetExists;

    function ensureWidgetExists(widgetName) {
      if (!$injector.has(widgetName + 'Directive')) {
        throw new Error('Widget \'' + widgetName + '\' não disponível.');
      }
    }

    function getLocalWidgets() {
      return angular.module('SnkNewTab.widgets')._invokeQueue
        .filter(function(item) {
          if (item[1] == 'value') {
            var widgetMDKey = item[2][0];
            return widgetMDKey.endsWith('.metadata');
          }

          return false;
        })
        .map(function(item){
          return item[2][1];
        });
    }

    function validateWidgetMD(widgetMd) {
      if (!widgetMd) {
        throw new Error('widget sem metadados.');
      }

      if (!widgetMd.name) {
        throw new Error('widget sem nome definido.');
      }
    }
  }]);
