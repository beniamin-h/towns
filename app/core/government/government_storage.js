'use strict';

angular.module('towns').factory('governmentStorage', ['Errors', function (Errors) {
  var that = this;

  this.resources = {
    'wood': 1000,
    'stone': 0
  };

  this.inhabitants_can_take_resources = true;

  return {
    getResources: function () {
      return that.resources;
    },
    inhabitantsCanTakeResources: function () {
      return this.inhabitants_can_take_resources;
    },
    _instance: this
  };
}]);