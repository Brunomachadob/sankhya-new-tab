var _messageProcessors = {
  waterAlarm: processWaterAlarmMessage
};

var _alarmProcessors = {
  waterAlarm: processWaterAlarmFired
};

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (_alarmProcessors[alarm.name]) {
    processWaterAlarmFired(alarm);
  }
});


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  var messageProcessor = _messageProcessors[message.id];

  if (messageProcessor) {
    return messageProcessor(message, sender, sendResponse);
  } else {
    sendResponse({type: 'ERROR', result:"messageProcessor não encontrado"});
  }
});

function processWaterAlarmMessage(message, sender, sendResponse) {
  switch (message.type) {
    case 'setup':
      chrome.alarms.create("waterAlarm", {periodInMinutes: message.periodInMinutes});
      sendResponse({type:"OK", result: true});
      break;
    case 'clear':
      chrome.alarms.clear("waterAlarm");
      sendResponse({type:"OK", result: false});
      break;
    case 'active':
      chrome.alarms.get('waterAlarm', function(alarm){
        sendResponse({type:"OK", result: alarm});
      });
      return true;
    default:
      sendResponse({type:"ERROR", result: 'São aceitos apenas os tipos setup e clear'});
  }
}

function processWaterAlarmFired(alarm) {
  new Notification('waterAlarm');
}
