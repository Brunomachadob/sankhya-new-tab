angular
  .module('SnkNewTab')
  .controller('ClockWidgetController', ['$interval', function($interval) {
    var self = this;

    setupClock();

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
