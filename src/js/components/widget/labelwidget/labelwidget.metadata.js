angular
  .module('SnkNewTab.widgets')
  .value('labelWidget.metadata', {
    name: "labelWidget",
    label: "Label",
    author: "Bruno Machado",
    defaultData: {
      label: 'Label default'
    },
    config: 'labelWidgetConfig'
  });
