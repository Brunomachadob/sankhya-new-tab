angular
  .module('SnkNewTab')
  .service('NotificationService', ['$q', function($q){
      var self = this;

      var GRANTED_PERMISSION = "granted";

      self.showNotification = showNotification;

      function showNotification(title, onClick, options) {
        if (!Notification) {
          return $q(function(resolve, reject) {
            reject('Desktop notifications not available in your browser.');
          });
        } else if (Notification.permission !== GRANTED_PERMISSION) {
          var defer = $q.defer();

          Notification.requestPermission()
            .then(function(answer) {
              if (answer == GRANTED_PERMISSION) {
                showNotification(title, onClick, options)
                  .then(function(notification) {
                    defer.resolve(notification);
                  });
              }
            });

          return defer.promise;
        } else {
          var notification = new Notification(title, options);
          notification.onclick = onClick;

          return $q(function(resolve, reject) {
            resolve(notification);
          });
        }
      }
  }]);
