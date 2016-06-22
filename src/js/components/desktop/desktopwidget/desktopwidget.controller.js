angular
  .module('SnkNewTab')
  .controller('DesktopWidgetController', ['$scope', '$uibModal', 'WidgetService', 'desktopCtrl', function($scope, $uibModal, WidgetService, desktopCtrl) {
    var self = this;

    self.openConfig = openConfig;
    self.widgetHasConfig = false;

    init();

    function init() {
      self.widgetHasConfig = WidgetService.widgetHasConfig($scope.widgetMd);
    }

    function openConfig() {
      var modalId = 'modal-' + Math.floor(Math.random() * 100);

      var modalInstance = $uibModal.open({
        title: 'Configurando ' + $scope.widgetMd.label,
        templateUrl: 'js/components/desktop/desktopwidget/desktopwidgetconfigcontainer.tpl.html',
        controller: 'DesktopWidgetConfigContainerController',
        size: 'md',
        windowClass: modalId,
        resolve: {
          widgetMd: function () {
            return angular.copy($scope.widgetMd);
          },
          modalId: function () {
            return modalId;
          }
        }
      }).result
      .then(function (data) {
        if (!angular.equals($scope.widgetMd.data, data, true)) {
          angular.extend($scope.widgetMd.data, data);
          desktopCtrl.widgetDataUpdated($scope.widgetMd);
        }
      });
    }
  }]);
