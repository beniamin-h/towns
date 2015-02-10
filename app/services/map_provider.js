'use strict';

angular.module('towns').factory('mapProvider', ['_map_config', 'Math', 'ArrayUtils', 'Errors',
    function (_map_config, Math, ArrayUtils, Errors) {

  var that = this;

  this.blocks = [];
  this.selected_block = null;

  return {
    getWidth: function () {
      return _map_config.map_dim.x;
    },
    getHeight: function () {
      return _map_config.map_dim.y;
    },
    initMap: function () {
      for (var i = 0; i < this.getWidth() * this.getHeight(); i++) {
        that.blocks.push({
          building: null,
          index: i
        });
      }
    },
    selectBlock: function (block) {
      that.selected_block = block;
    },
    getSelectedBlock: function () {
      return that.selected_block;
    },
    getAllBlocks: function () {
      return that.blocks;
    },
    getBlockByXY: function (x, y) {
      return that.blocks[y * _map_config.map_dim.x + x];
    },
    getBlockIndexByXY: function (x, y) {
      return y * _map_config.map_dim.x + x;
    },
    getEmptyRandomBlockIndex: function () {
      var blocks_count = this.getWidth() * this.getHeight(),
          random_block_n = Math.floor(Math.random() * blocks_count),
          randomized_blocks, n = -1;

      if (that.blocks[random_block_n].building === null) {
        return random_block_n;
      } else {
        randomized_blocks = ArrayUtils.shuffle(ArrayUtils.range(blocks_count));
        while (++n < blocks_count) {
          if (that.blocks[randomized_blocks[n]].building === null) {
            return randomized_blocks[n];
          }
        }

        throw new Errors.noEmptyMapBlocksError();
      }
    },
    getEmptyRandomBlockIndexWithinRect: function (x, y, width, height) {
      var blocks_count = width * height,
          randomized_blocks, n = -1,
          random_block_n = this.getBlockIndexByXY(
            x + Math.floor(Math.random() * width),
            y + Math.floor(Math.random() * height)
          );

      if (that.blocks[random_block_n].building === null) {
        return random_block_n;
      } else {
        for (var i = y, blocks_within_rect = []; i < height + y; i++) {
          blocks_within_rect.push.apply(blocks_within_rect, ArrayUtils.range(width, x + i * _map_config.map_dim.x));
        }
        randomized_blocks = ArrayUtils.shuffle(blocks_within_rect);
        while (++n < blocks_count) {
          if (that.blocks[randomized_blocks[n]].building === null) {
            return randomized_blocks[n];
          }
        }

        throw new Errors.noEmptyMapBlocksError();
      }
    },
    setBlockBuilding: function (block_index, building) {
      that.blocks[block_index].building = building;
    },
    _factory: this
  };
}]);