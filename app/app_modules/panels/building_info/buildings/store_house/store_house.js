'use strict';

angular.module('towns.building_info')

.controller('StoreHousePanel', ['$scope', 'mapProvider', 'Resources',
    function($scope, mapProvider, Resources) {

  // ------------------- INIT -------------------

  $scope._initStoreHousePanel = function() {
    $scope.resources = mapProvider.getSelectedBlock().building.resources;
    $scope.gathering = {
      selected_resource: null,
      selected_resource_requested: null,
      requested: {}
    };
    for (var res_name in Resources.getResourcesInfo()) {
      $scope.gathering.requested[res_name] = {
        max_collectors_number: 1,
        gather_resource_amount: 100
      };
    }
  };

  // ------------------- SCOPE METHODS -------------------

  $scope.onGatherResourceSelected = function (res_name) {
    $scope.gathering.selected_resource = res_name;
    $scope.gathering.selected_resource_requested = $scope.gathering.requested[res_name];
  };

  $scope.onGatherOrdered = function () {
    var selectedStoreHouse = mapProvider.getSelectedBlock().building;
    selectedStoreHouse.setRequestedResourceAmount(
      $scope.gathering.selected_resource,
      $scope.gathering.selected_resource_requested.max_collectors_number,
      $scope.gathering.selected_resource_requested.gather_resource_amount
    );
    $scope.gathering.selected_resource = null;
    $scope.gathering.selected_resource_requested = null;
  };

  $scope.onCancelClicked = function () {
    $scope.gathering.selected_resource = null;
    $scope.gathering.selected_resource_requested = null;
  };

}]);