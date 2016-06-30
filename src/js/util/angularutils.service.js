angular
  .module('SnkNewTab')
  .service('AngularUtils', ['$compile', '$rootScope', function($compile, $rootScope) {
    var self = this;

    self.createDirective = createDirective;
    self.toDashCase = toDashCase;
    self.digest = digest;
    self.apply = apply;

    function toDashCase(value) {
      return value && value.replace(/([A-Z])/g, function ($1, p1, pos) {
          return (pos > 0 ? '-' : '') + $1.toLowerCase();
      });
    }

    function createDirective(name, attrs, scope, requiredControllers) {
        var element = angular.element(document.createElement(name));

        angular.forEach(attrs, function (value, key) {
            element.attr(key, value);
        });

        if (requiredControllers) {
            angular.forEach(requiredControllers, function (controller, controllerName) {
                element.data('$' + controllerName + 'Controller', controller);
            });
        }

        var directive = $compile(element)(scope);

        return directive;
    }

    function digest(scope) {
      if (angular.isDefined(scope) && !$rootScope.$$phase) {
          scope.$digest();
      }
    }

    function apply(scope, applyFn) {
      var fn = (applyFn || angular.noop);

      if (!$rootScope.$$phase) {
          scope.$apply(fn);
      } else {
          fn();
      }
    }
  }]);
