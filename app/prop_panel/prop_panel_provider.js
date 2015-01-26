'use strict';

angular.module('towns').factory('propPanelProvider', ['Errors', function (Errors) {
  var that = this;

  this.selected_prop_panel_tab_opts = null;


  return {
    setSelectedPropPanelTabOpts: function (opts) {
      that.selected_prop_panel_tab_opts = opts;
    },
    selectPropPanelTab: function (selected_tab) {
      for (var tab in that.selected_prop_panel_tab_opts) {
        if (that.selected_prop_panel_tab_opts.hasOwnProperty(tab)) {
          that.selected_prop_panel_tab_opts[tab] = tab == selected_tab;
        }
      }
    },
    getSelectedPropPanelTabOpts: function () {
      return that.selected_prop_panel_tab_opts;
    },
    getSelectedPropPanelTab: function () {
      return (Object.keys(that.selected_prop_panel_tab_opts).filter(function (elem) {
        return that.selected_prop_panel_tab_opts[elem];
      })).pop();
    },
    _factory: this
  };
}]);