angular
  .module('SnkNewTab')
  .controller('HomeController', ['$interval', '$timeout', '$injector', 'NotificationService', 'localStorageService', function($interval, $timeout, $compileProvider, NotificationService, localStorageService) {
    var self = this;

    var STORAGE_KEY = 'desktop-md';

    self.showNotification = showNotification;
    self.save = save;

    init();

    function init() {
      setupDesktopMD();
    }

    function save(metadata) {
      localStorageService.set(STORAGE_KEY, metadata);
      console.info('Desktop salvo!');
    }

    function setupDesktopMD() {
        self.desktopMD = localStorageService.get(STORAGE_KEY);

        if (!self.desktopMD) {
          self.desktopMD = getDefaultDesktopMD();
        }
    }

    function getDefaultDesktopMD() {
      return [
         [
            {
               "name":"labelWidget",
               "type":"widget"
            },
            {
               "name":"clockWidget",
               "type":"widget"
            }
         ],
         [
            {
               "type":"widget",
               "name":"clockWidget"
            }
         ]
      ];
    }

    function showNotification() {
      /*$timeout(function() {
        NotificationService.showNotification('Teste', function() {
          console.log('clicked');
        }, {
          icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: "Hey there! You've been notified!",
        }).then(function(notification) {
          console.log(notification);
        });
      }, 2000, false);*/
    }
  }]);
