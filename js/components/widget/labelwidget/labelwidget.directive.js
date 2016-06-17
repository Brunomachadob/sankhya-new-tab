angular
  .module('SnkNewTab')
  .directive('labelWidget', [function() {
      return {
          restrict: 'E',
          template: '<div class="item" ng-bind="data"></div>',
          scope: {
            data: '='
          }
      };

   }]);
