angular
  .module('SnkNewTab.widgets')
  .controller('WaterAlarmWidgetController', ['$scope', '$interval', '$element', 'AngularUtils', function($scope, $interval, $element, AngularUtils) {
    var self = this;

    self.toggleAlarm = toggleAlarm;

    var _checkAliveInterval;
    var _animationInterval;

    init();

    function init() {
      $scope.$watch('data.tempo', function(newV) {
        if (newV > 0 && $scope.data.ativo) {
          setupAlarm();
        } else {
          cancelAlarm();
        }
      });
    }

    function calculateWaterHeigth() {
      var alarm = self.alarm;
      var waterHeigth = 0;

      if ($scope.data.ativo && alarm) {
        var timeToFire = ((alarm.scheduledTime - Date.now())/1000/60);
        var timeElapsed = ($scope.data.tempo) - timeToFire;
        var timePercent = timeElapsed / ($scope.data.tempo);

        var maxH = $element[0].querySelector('.bubble').offsetHeight;
        var currentH = timePercent * maxH;

        currentH = Math.round(currentH * 100) / 100;
        waterHeigth = Math.round(currentH);
      }

      if (waterHeigth != self.waterHeigth) {
          self.waterHeigth = waterHeigth;
          AngularUtils.digest($scope);
      }

    }

    function toggleAlarm() {
      ($scope.data.ativo ? cancelAlarm : setupAlarm)();
    }

    function setupAlarm() {
      chrome.runtime.sendMessage({id: 'waterAlarm', type: 'setup', periodInMinutes: $scope.data.tempo}, function(response) {
        if (checkOKResponseOrShowError(response)) {
          $scope.data.ativo = response.result;

          _checkAliveInterval = $interval(checkAlive, 1000 * 5, 0, false);
          _animationInterval = $interval(calculateWaterHeigth, 500, 0, false);

          AngularUtils.digest($scope);
        }
      });
    }

    function cancelAlarm() {
      chrome.runtime.sendMessage({id: 'waterAlarm', type: 'clear'}, function(response) {
        if (checkOKResponseOrShowError(response)) {
          $scope.data.ativo = response.result;

          if (!$scope.data.ativo) {
            if (_animationInterval) {
              $interval.cancel(_animationInterval);
            }

            if (_checkAliveInterval) {
              calculateWaterHeigth();
              $interval.cancel(_checkAliveInterval);
            }
          }

          AngularUtils.digest($scope);
        }
      });
    }

    function checkAlive() {
      chrome.runtime.sendMessage({id: 'waterAlarm', type: 'active'}, function(response) {
        if (checkOKResponseOrShowError(response)) {
          self.alarm = response.result;
          $scope.data.ativo = angular.isDefined(self.alarm);

          if (!$scope.data.ativo) {
            cancelAlarm();
          }

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
