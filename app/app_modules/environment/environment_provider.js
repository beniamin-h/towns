'use strict';

angular.module('towns').factory('environmentProvider', ['EnvironmentBlock', 'EnvironmentConfig',
    function (EnvironmentBlock, EnvironmentConfig) {
  var that = this;

  this.blocks = [];
  this.player_town_block = null;

  return {
    getMapWidth: function () {
      return EnvironmentConfig.map_dim.x;
    },
    getMapHeight: function () {
      return EnvironmentConfig.map_dim.y;
    },
    initEnvironment: function () {
      var blocks_count = this.getMapWidth() * this.getMapHeight(),
        map_center_index = this.getBlockIndexByXY(this.getMapWidth() / 2, this.getMapHeight() / 2);
      for (var i = 0; i < blocks_count; i++) {
        var env_block = new EnvironmentBlock(i, i == map_center_index);
        if (i == map_center_index) {
          that.player_town_block = env_block;
        }
        that.blocks.push(env_block);
      }
    },
    getBlockIndexByXY: function (x, y) {
      return y * EnvironmentConfig.map_dim.x + x;
    },
    getPlayerTownBlock: function () {
      return that.player_town_block;
    },
    getAllBlocks: function () {
      return that.blocks;
    },
    _instance: this
  };
}]);