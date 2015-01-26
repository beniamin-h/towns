'use strict';

angular.module('towns.map', ['ui.bootstrap'])

.value('_map_config', {
    map_dim: {
      x: 20,
      y: 16
    },
    block_size: 50
  })

.controller('MapCtrl', ['$scope', 'buildingsProvider', 'mapProvider', 'propPanelProvider',
                        'governmentInfoProvider', '_map_config',
    function($scope, buildingsProvider, mapProvider, propPanelProvider,
             governmentInfoProvider, _map_config) {
  var that = this;

  this.select_block = function (block) {
    mapProvider.selectBlock(block);
    $scope.selected_block = block;
  };

  $scope.init = function() {
    $scope.block_size = _map_config.block_size;
    $scope.blocks = mapProvider.getAllBlocks();
    $scope.implode = function (prev, curr) { return prev ? prev + ', ' + curr.name : curr.name; };
    $scope.selected_mask = { value: 'select_map_block' };
    mapProvider.setSelectedMaskObj($scope.selected_mask);
  };

  $scope.isClickable = function (block) {
    return ($scope.selected_mask.value == 'select_map_block' && block.building != null ||
      $scope.selected_mask.value == 'select_new_building_position' && block.building == null) ? 'clickable' : '';
  };

  $scope.getBlockOpacity = function (block) {
    return block.building ? block.building.constructing_progress * 0.8 + 0.2 : 1;
  };

  $scope.blockClicked = function (block) {
    if ($scope.selected_mask.value == 'select_map_block') {
      if (block.building) {
        that.select_block(block);
        propPanelProvider.selectPropPanelTab('building');
      }
    } else if ($scope.selected_mask.value == 'select_new_building_position') {
      if (!block.building) {
        buildingsProvider.build(governmentInfoProvider.getSelectedBuildingClass(),
          block.index, governmentInfoProvider.getGovernment());
        governmentInfoProvider.selectActiveMenu('build');
        $scope.selected_mask.value = 'select_map_block';
      }
    }
  };
}]);
