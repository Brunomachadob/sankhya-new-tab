angular
  .module('SnkNewTab')
  .directive('desktopWidgetError', [function() {
      return {
          restrict: 'E',
          template: '<div class="item" ng-bind="data.message"></div>',
          scope: {
            data: '='
          }
      };
   }]);
