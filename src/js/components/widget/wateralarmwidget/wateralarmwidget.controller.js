angular
  .module('SnkNewTab.widgets')
  .controller('WaterAlarmWidgetController', ['$scope', 'AngularUtils', function($scope, AngularUtils) {
    var self = this;

    self.toggleAlarm = toggleAlarm;
    self.checkAlive = checkAlive;
    self.getBtnText = getBtnText;

    self.isAlive = false;

    init();

    function init() {
      checkAlive();
    }

    function getBtnText() {
      return self.isAlive ? 'ON' : 'OFF';
    }

    function toggleAlarm() {
      (self.isAlive ? cancelAlarm : setupAlarm)();
    }

    function setupAlarm() {
      chrome.runtime.sendMessage({id: 'waterAlarm', type: 'setup', delayInMinutes: 0.2}, function(response) {
        if (checkOKResponseOrShowError(response)) {
          self.isAlive = response.result;
          AngularUtils.digest($scope);
        }
      });
    }

    function cancelAlarm() {
      chrome.runtime.sendMessage({id: 'waterAlarm', type: 'clear'}, function(response) {
        if (checkOKResponseOrShowError(response)) {
          self.isAlive = response.result;
          AngularUtils.digest($scope);
        }
      });
    }

    function checkAlive() {
      chrome.runtime.sendMessage({id: 'waterAlarm', type: 'active'}, function(response) {
        if (checkOKResponseOrShowError(response)) {
          self.isAlive = response.result;
          AngularUtils.digest($scope);
        }
      });
    }

    function checkOKResponseOrShowError(response) {
      if (response && response.type == 'ERROR') {
        console.error(response.result);
        return false;
      }

      return true;
    }
   }]);
