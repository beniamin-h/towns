'use strict';

angular.module('towns').factory('environmentProvider', ['EnvironmentBlock', 'EnvironmentConfig',
    function (EnvironmentBlock, EnvironmentConfig) {
  var that = this;

  this.blocks = [];

  return {
    getMapWidth: function () {
      return EnvironmentConfig.map_dim.x;
    },
    getMapHeight: function () {
      return EnvironmentConfig.map_dim.y;
    },
    initEnvironment: function () {
      for (var i = 0; i < this.getMapWidth() * this.getMapHeight(); i++) {
        that.blocks.push(new EnvironmentBlock(i));
      }
    },
    getBlockIndexByXY: function (x, y) {
      return y * EnvironmentConfig.map_dim.x + x;
    },
    getAllBlocks: function () {
      return that.blocks;
    },
    _factory: this
  };
}]);