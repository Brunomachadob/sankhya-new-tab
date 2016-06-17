angular
  .module('SnkNewTab')
  .controller('DashboardController', [function() {
    var self = this;

    self.models = {
        selected: null,
        templates: [
            {type: "widget", "name": "labelWidget", "data": "Outro label", id: 2},
            {type: "container", id: 2, columns: [[], []]}
        ],
        dropzones: {
            "A": [
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
            ]
        }
    };
   }]);
