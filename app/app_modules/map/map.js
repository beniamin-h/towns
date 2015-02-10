'use strict';

angular.module('towns.map', ['ui.bootstrap'])

.value('_map_config', {
    map_dim: {
      x: 20,
      y: 16
    },
    block_size: 50
  })

.controller('MapCtrl', ['$scope', '$rootScope', 'mapProvider', '_map_config',
    function($scope, $rootScope, mapProvider, _map_config) {

  var select_block = function (block) {
    mapProvider.selectBlock(block);
    $scope.selected_block = block;
  };

  // ------------------- INIT -------------------

  $scope._initMap = function() {
    $scope.block_size = _map_config.block_size;
    $scope.blocks = mapProvider.getAllBlocks();
    $scope.implode = function (prev, curr) { return prev ? prev + ', ' + curr.name : curr.name; };
    $scope.selected_mask = 'selecting_map_block';
  };

  // ------------------- LISTENERS -------------------

  $scope.$on('enterBuildMode', function (event, building_class) {
    $scope.selected_mask = 'selecting_new_building_position';
  });

  $scope.$on('leaveBuildMode', function (event, building_class) {
    $scope.selected_mask = 'selecting_map_block';
  });

  // ------------------- SCOPE METHODS -------------------

  $scope.isClickable = function (block) {
    return ($scope.selected_mask == 'selecting_map_block' && block.building != null ||
      $scope.selected_mask == 'selecting_new_building_position' && block.building == null) ? 'clickable' : '';
  };

  $scope.getBlockOpacity = function (block) {
    return block.building ? block.building.constructing_progress * 0.8 + 0.2 : 1;
  };

  $scope.blockClicked = function (block) {
    if ($scope.selected_mask == 'selecting_map_block') {
      if (block.building) {
        select_block(block);
        $rootScope.$broadcast('buildingSelected', block.building);
      }
    }
    if ($scope.selected_mask == 'selecting_new_building_position') {
        $rootScope.$broadcast('newBuildingPositionSelected', block);
    }
  };
}]);
