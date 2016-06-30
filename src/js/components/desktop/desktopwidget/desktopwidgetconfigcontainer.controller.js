angular
  .module('SnkNewTab')
  .controller('DesktopWidgetConfigContainerController', ['$scope', '$document', '$uibModalInstance', 'AngularUtils', 'widgetMd', 'modalId', function($scope, $document, $uibModalInstance, AngularUtils, widgetMd, modalId) {
    var self = this;

    $scope.widgetMd = widgetMd;

    $scope.save = save;
    $scope.cancel = cancel;

    init();

    function init() {
      $scope.modalTitle = 'Configurando ' + (widgetMd.label || widgetMd.name);

      var configWidget = getWidget();

      $uibModalInstance.rendered.then(function(){
        $document.find('.' + modalId + ' .modal-body').append(configWidget);
      });
    }

    function getWidget() {
      var widgetName = AngularUtils.toDashCase(widgetMd.configDirective);
      return AngularUtils.createDirective(widgetName, {'data': 'widgetMd.data'}, $scope.$new());
    }

    function save() {
      $uibModalInstance.close($scope.widgetMd.data);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }]);
