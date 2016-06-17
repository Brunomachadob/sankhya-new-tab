angular
  .module('SnkNewTab')
  .controller('HomeController', ['$interval', 'NotificationService', function($interval, NotificationService) {
    var self = this;

    self.showNotification = showNotification;

    init();

    function init() {
      setupClock();
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

    function setupClock() {
      self.clock = {
        time: Date.now(),
        hourFormat: 'HH:mm:ss',
        dateFormat: 'dd/MM/yyyy',
        interval: 1000
      };

      $interval(function () {
        self.clock.time = Date.now();
      }, self.clock.interval);
    }
  }]);
