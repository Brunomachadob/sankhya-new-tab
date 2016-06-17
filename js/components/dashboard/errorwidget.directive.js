angular
  .module('SnkNewTab')
  .directive('dashWidgetError', [function() {
      return {
          restrict: 'E',
          template: '<div class="item" ng-bind="data.message"></div>',
          scope: {
            data: '='
          }
      };

   }]);
