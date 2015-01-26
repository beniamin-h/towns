'use strict';

angular.module('towns.prop_panel', ['ui.bootstrap'])

.controller('PropPanelCtrl', ['propPanelProvider', '$scope', function(propPanelProvider, $scope) {
  $scope.selected_prop_panel_tab = {
    government: true,
    population: false,
    resources: false,
    building: false
  };
  propPanelProvider.setSelectedPropPanelTabOpts($scope.selected_prop_panel_tab);
}]);