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
              "type": "container",
              "id": 1,
              "columns": [
                  [
                      {
                          "type": "widget",
                          "name": "labelWidget",
                          "data": "um label"
                      },
                      {
                          "type": "widget",
                          "name": "clockWidget",
                          "data": {}
                      }
                  ],
                  [{
                      "type": "widget",
                      "name": "labelWidget",
                      "data": "Outro label"
                  }]
              ]
          }
      ],
      [
        {
            "type": "widget",
            "name": "clockWidget",
            "data": {}
        }
      ]
    ];
    }

    function showNotification() {
      NotificationService.showNotification('Teste', function() {
        console.log('clicked');
      }, {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: "Hey there! You've been notified!",
      }).then(function(notification) {
        console.log(notification);
      });
    }
  }]);
