angular
  .module('SnkNewTab')
  .directive('desktop', [function() {
      return {
          restrict: 'E',
          controller: 'DesktopController',
          templateUrl: 'js/components/desktop/desktop.tpl.html',
          controllerAs: 'desktopCtrl',
          scope: {

          }

      };

   }]);
