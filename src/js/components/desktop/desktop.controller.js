angular
  .module('SnkNewTab')
  .controller('DesktopController', ['$scope', 'WidgetService', function($scope, WidgetService) {
    var self = this;

    self.editionMode = false;
    self.desktopChanged = false;

    self.models = {
        dropzoneIndex: 0,
        templates: [],
        dropzones: []
    };

    self.toggleEditionMode = toggleEditionMode;
    self.onDesktopChange = onDesktopChange;
    self.widgetDataUpdated = widgetDataUpdated;

    init();

    function init() {
      $scope.$watch('metadata', function(newMD) {
        metadataUpdated(newMD);
      });

      WidgetService.getLocalWidgets()
        .forEach(function(widgetMD) {
          self.models.templates.push(WidgetService.populateRuntimeData({
            type: 'widget',
            label: widgetMD.label || widgetMD.name,
            name: widgetMD.name
          }));
        });

        self.models.templates.push({type: "container", label: "container", columns: [[], []]});
    }

    function metadataUpdated(newMD) {
      if (newMD) {
        newMD = angular.copy(newMD);

        metadataIterator(newMD, function widgetHandler(widget) {
          WidgetService.populateRuntimeData(widget);
        });

        self.models.dropzones = newMD;
      } else {
        self.models.dropzones = [];
      }
    }

    function metadataIterator(metadata, widgetHandler) {
      if (angular.isArray(metadata)) {
        metadata.forEach(function(item){
          metadataIterator(item, widgetHandler);
        });
      } else if (angular.isObject(metadata)) {
        if (metadata.type == 'widget') {
          widgetHandler(metadata);
        } else if (metadata.type == 'container') {
          metadataIterator(metadata.columns, widgetHandler);
        } else {
          throw Error('Metadado com tipo inválido: ' + metadata.type);
        }
      }
    }

    function onDesktopChange() {
      self.desktopChanged = true;
    }

    function toggleEditionMode() {
      self.editionMode = !self.editionMode;

      if (!self.editionMode) {
        if (self.desktopChanged) {
          saveMetadata();
          self.desktopChanged = false;
        }
      }
    }

    function saveMetadata() {
      var metadata = angular.copy(self.models.dropzones);

      metadataIterator(metadata, function(widget) {
        WidgetService.clearRuntimeData(widget);
      });

      $scope.save({metadata: metadata});
    }

    function widgetDataUpdated(widgetMd) {
      saveMetadata();
    }
   }]);
