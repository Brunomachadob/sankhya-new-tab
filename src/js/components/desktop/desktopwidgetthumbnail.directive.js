angular
  .module('SnkNewTab')
  .directive('desktopWidgetThumbnail', ['$injector', 'AngularUtils', 'WidgetService', function($injector, AngularUtils, WidgetService) {
      return {
          restrict: 'E',
          require: '^desktop',
          scope: {
            widgetMd: '='
          },
          link: function(scope, element, attr, dashCtrl) {
            var thumbnailName;
            var thumbnailData;

            var button = false;
            try {
              WidgetService.validateWidgetMD(scope.widgetMd);

              var thumbnail = scope.widgetMd.thumbnail;
              thumbnailName = thumbnail.name;
              thumbnailData = thumbnail.data;

              WidgetService.ensureWidgetExists(thumbnailName);
            } catch(error) {
              button = true;

              thumbnailName = 'button';
              thumbnailData = {};
            }

            thumbnailName = AngularUtils.toDashCase(thumbnailName);

            scope.widgetData = thumbnailData;

            var directive = AngularUtils.createDirective(thumbnailName, {'data': 'widgetData'}, scope.$new());

            directive.addClass('widget-thumbnail');

            if (button) {
              directive.addClass('btn btn-primary btn-block');
              directive.text(scope.widgetMd.label);
            }

            element.append(directive);
          }
      };

   }]);
