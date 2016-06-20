angular
  .module('SnkNewTab')
  .controller('HomeController', ['$interval', '$timeout', '$injector', 'NotificationService', function($interval, $timeout, $compileProvider, NotificationService) {
    var self = this;

    self.showNotification = showNotification;

    init();

    function init() {
      setupDesktopMD();
    }

    function setupDesktopMD() {
      $timeout(function() { //Só pra simular uma carga assíncrona
        self.desktopMD = [
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
        ];
      }, 1000);
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
