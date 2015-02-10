'use strict';

angular.module('towns.prop_panel', ['ui.bootstrap'])

.controller('PropPanelCtrl', ['$scope', function($scope) {

  // ------------------- INIT -------------------

  $scope._initPropPanel = function() {
    $scope.selected_prop_panel_tab = {
      government: true,
      population: false,
      resources: false,
      building: false
    };
  };

  // ------------------- LISTENERS -------------------

  $scope.$on('buildingBlockClicked', function (event, block) {
    $scope.selectPropPanelTab('building');
  });

  // ------------------- SCOPE METHODS -------------------

  $scope.selectPropPanelTab = function (selected_tab) {
    for (var tab in $scope.selected_prop_panel_tab) {
      if ($scope.selected_prop_panel_tab.hasOwnProperty(tab)) {
        $scope.selected_prop_panel_tab[tab] = tab == selected_tab;
      }
    }
  }
}]);