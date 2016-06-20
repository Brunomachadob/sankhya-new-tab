angular
  .module('SnkNewTab')
  .controller('DesktopController', ['$scope', 'WidgetService', function($scope, WidgetService) {
    var self = this;

    self.editionMode = false;
    self.desktopChanged = false;

    self.models = {
        templates: [],
        dropzones: {
            "A": []
        }
    };

    self.toggleEditionMode = toggleEditionMode;
    self.onDesktopChange = onDesktopChange;

    init();

    function init() {
      $scope.$watch('metadata', function(newMD) {
        self.models.dropzones.A = newMD;
      });

      WidgetService.getLocalWidgets()
        .forEach(function(widgetMD) {
          self.models.templates.push(angular.extend(widgetMD, {type: 'widget', data: 'Label'}));
        });

        self.models.templates.push({type: "container", label: "container", id: 2, columns: [[], []]});
    }

    function onDesktopChange() {
      self.desktopChanged = true;
    }

    function toggleEditionMode() {
      self.editionMode = !self.editionMode;

      if (!self.editionMode) {
        if (self.desktopChanged) {
          $scope.save({metadata: self.models.dropzones.A});

          self.desktopChanged = false;
        }
      }
    }
   }]);
