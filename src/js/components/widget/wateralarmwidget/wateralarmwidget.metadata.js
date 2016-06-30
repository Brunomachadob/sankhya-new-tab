angular
  .module('SnkNewTab.widgets')
  .value('waterAlarmWidget.metadata', {
    name: "waterAlarmWidget",
    label: "Alarme de Água",
    configDirective: 'waterAlarmWidgetConfig',
    defaultData: {
      ativo: false,
      tempo: 15
    },
    author: "Bruno Machado"
  });
