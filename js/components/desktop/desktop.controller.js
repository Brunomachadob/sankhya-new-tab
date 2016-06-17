angular
  .module('SnkNewTab')
  .controller('DesktopController', ['$scope', function($scope) {
    var self = this;

    self.editionMode = false;

    self.toggleEditionMode = toggleEditionMode;

    self.models = {
        selected: null,
        templates: [
            {type: "widget", "name": "labelWidget", label:"label", "data": "Outro label"},
            {type: "widget", "name": "clockWidget", label:"clock"},
            {type: "container", label: "container", id: 2, columns: [[], []]}
        ],
        dropzones: {
            "A": []
        }
    };

    init();

    function init() {
      $scope.$watch('metadata', function(newMD) {
        self.models.dropzones['A'] = newMD;
      });
    }

    function toggleEditionMode() {
      self.editionMode = !self.editionMode;
    }
   }]);
