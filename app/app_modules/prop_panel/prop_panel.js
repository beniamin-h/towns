'use strict';

angular.module('towns.prop_panel', ['ui.bootstrap'])

.controller('PropPanelCtrl', ['$scope', function($scope) {

  // ------------------- INIT -------------------

  $scope._initPropPanel = function() {
    $scope.selected_prop_panel_tab = {
      government: true,
      population: false,
      resources: false,
      building: false,
      environment: false
    };
  };

  // ------------------- LISTENERS -------------------

  $scope.$on('buildingSelected', function (event, builing) {
    $scope.selectPropPanelTab('building');
  });

  $scope.$on('envBlockClicked', function (event, builing) {
    $scope.selectPropPanelTab('environment');
  });

  $scope.$on('populationListItemClicked', function (event, building_class) {
    $scope.selectPropPanelTab('population');
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