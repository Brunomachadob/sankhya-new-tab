angular
  .module('SnkNewTab.widgets')
  .service('WidgetService', ['$injector', function($injector) {
    var self = this;

    var _localWidgets;
    var _localWidgetsMap;

    self.getLocalWidgets = getLocalWidgets;
    self.getLocalWidgetsMap = getLocalWidgetsMap;
    self.getWidgetByName = getWidgetByName;
    self.validateWidgetMD = validateWidgetMD;
    self.ensureWidgetExists = ensureWidgetExists;
    self.widgetHasConfig = widgetHasConfig;
    self.populateRuntimeData = populateRuntimeData;
    self.clearRuntimeData = clearRuntimeData;

    function widgetHasConfig(widgetMd) {
      return widgetMd.configDirective && ensureWidgetExists(widgetMd.configDirective);
    }

    function ensureWidgetExists(widgetName) {
      if (!$injector.has(widgetName + 'Directive')) {
        throw new Error('Widget \'' + widgetName + '\' não disponível.');
      }

      return true;
    }

    function getLocalWidgets() {
      if (!_localWidgets) {
        _localWidgets = angular.module('SnkNewTab.widgets')._invokeQueue
          .filter(function(item) {
            if (item[1] == 'value') {
              var widgetMDKey = item[2][0];
              return widgetMDKey.endsWith('.metadata');
            }

            return false;
          })
          .map(function(item){
            var widgetMd = item[2][1];
            validateWidgetMD(widgetMd);
            return widgetMd;
          });
      }

      return _localWidgets;
    }

    function getLocalWidgetsMap() {
      if (!_localWidgetsMap) {
        _localWidgetsMap = {};

        getLocalWidgets().forEach(function(widgetMd) {
          _localWidgetsMap[widgetMd.name] = widgetMd;
        });
      }

      return _localWidgetsMap;
    }

    function getWidgetByName(widgetName) {
      var widgetMd = getLocalWidgetsMap()[widgetName];

      if (!widgetMd) {
        throw new Error('Widget \'' + widgetName + '\' inexistente');
      }

      return widgetMd;
    }

    function validateWidgetMD(widgetMd) {
      if (!widgetMd) {
        throw new Error('widget sem metadados.');
      }

      if (!widgetMd.name) {
        throw new Error('widget sem nome definido.');
      }

      if (widgetMd.config) {
        ensureWidgetExists(widgetMd.config);
      }
    }

    function populateRuntimeData(widget) {
      var widgetMd = getWidgetByName(widget.name);

      if (!widget.data) {
        widget.data = angular.copy(widgetMd.defaultData);
      }

      widget.configDirective = widgetMd.configDirective;
      widget.thumbnail = widgetMd.thumbnail;
      widget.label = widgetMd.label;

      return widget;
    }

    function clearRuntimeData(widget) {
      delete widget.configDirective;
      delete widget.thumbnail;
      delete widget.label;
    }
  }]);
