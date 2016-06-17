angular
  .module('SnkNewTab')
  .directive('dashboard', [function() {
      return {
          restrict: 'E',
          controller: 'DashboardController',
          templateUrl: 'js/components/dashboard/dashboard.tpl.html',
          controllerAs: 'dashCtrl',
          scope: {

          }

      };

   }]);
