angular
  .module('SnkNewTab')
  .service('DesktopService', [function(){

      var _desktopInstance;

      var _desktopWrapper = {
        widgetDataUpdated: function(widgetMd) {
          _desktopInstance.widgetDataUpdated(widgetMd);
        }
      };

      this.instance = function(desktop){
          if (desktop){ //set
              if (_desktopInstance) {
                  throw new Error('Desktop já instanciado');
              }

              _desktopInstance = desktop;
          } else { //get
              if (!_desktopInstance){
                  throw new Error('Desktop não iniciado');
              }

              return _desktopWrapper;
          }
      };
  }])
  .provider('DesktopInstance', function () {
      this.$get = ['DesktopService', function (DesktopService) {
          return DesktopService.instance();
      }];
  });
