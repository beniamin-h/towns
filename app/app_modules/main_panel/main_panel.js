'use strict';

angular.module('towns.main_panel', ['ui.bootstrap'])

.controller('MainPanelCtrl', ['$scope', function($scope) {

  // ------------------- INIT -------------------

  $scope._initMainPanel = function() {
    $scope.selected_main_panel_tab = {
      map: true,
      environment: false,
      population: false
    };
  };

  // ------------------- LISTENERS -------------------

  //$scope.$on('buildingSelected', function (event, builing) {

  //});

  // ------------------- SCOPE METHODS -------------------

  $scope.selectMainPanelTab = function (selected_tab) {
    for (var tab in $scope.selected_main_panel_tab) {
      if ($scope.selected_main_panel_tab.hasOwnProperty(tab)) {
        $scope.selected_main_panel_tab[tab] = tab == selected_tab;
      }
    }
  }
}]);