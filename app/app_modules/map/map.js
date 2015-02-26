'use strict';

angular.module('towns.map', ['ui.bootstrap'])

.value('_map_config', {
    map_dim: {
      x: 40,
      y: 40
    },
    block_size: 50,
    map_window_dim: {
      x: 1000,
      y: 800
    }
  })

.controller('MapCtrl', ['$scope', '$rootScope', 'mapProvider', '_map_config', 'Math', '$timeout',
    function($scope, $rootScope, mapProvider, _map_config, Math, $timeout) {

  var scroll_timeout;

  $scope.window_scroll_offsets = {
    left: -500,
    top: -600
  };
  $scope.max_scroll_offsets = {
    left: -_map_config.block_size * _map_config.map_dim.x + _map_config.map_window_dim.x,
    top: -_map_config.block_size * _map_config.map_dim.y + _map_config.map_window_dim.y
  };

  var scroll_window = function (side, iteration) {
      if (side == 'left') {
        $scope.window_scroll_offsets.left += _map_config.block_size * iteration;
        if ($scope.window_scroll_offsets.left > 0) {
          $scope.window_scroll_offsets.left = 0;
        }
      }
      if (side == 'right') {
        $scope.window_scroll_offsets.left -= _map_config.block_size * iteration;
        if ($scope.window_scroll_offsets.left < $scope.max_scroll_offsets.left) {
          $scope.window_scroll_offsets.left = $scope.max_scroll_offsets.left;
        }
      }
      if (side == 'top') {
        $scope.window_scroll_offsets.top += _map_config.block_size * iteration;
        if ($scope.window_scroll_offsets.top > 0) {
          $scope.window_scroll_offsets.top = 0;
        }
      }
      if (side == 'bottom') {
        $scope.window_scroll_offsets.top -= _map_config.block_size * iteration;
        if ($scope.window_scroll_offsets.top < $scope.max_scroll_offsets.top) {
          $scope.window_scroll_offsets.top = $scope.max_scroll_offsets.top;
        }
      }
      scroll_timeout = $timeout(function() { scroll_window(side, iteration + 0.2) }, 100);
    },

    select_block = function (block) {
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

  $scope.mapWindowScrollHovered = function (side) {
    if (side) {
      scroll_timeout = $timeout(function() { scroll_window(side, 1) }, 200);
    } else {
      $timeout.cancel(scroll_timeout);
      $scope.window_scroll_offsets.top =
        $scope.window_scroll_offsets.top - $scope.window_scroll_offsets.top % _map_config.block_size;
      $scope.window_scroll_offsets.left =
        $scope.window_scroll_offsets.left - $scope.window_scroll_offsets.left % _map_config.block_size;
    }
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
