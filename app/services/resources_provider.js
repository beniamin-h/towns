'use strict';

angular.module('towns').factory('resourcesProvider', ['Errors', function (Errors) {
  var that = this;

  this.amounts = {
    'wood': 1000,
    'stone': 0
  };

  return {
    getResourceAmount: function (type) {
      return that.amounts[type];
    },
    getAllResourcesTypes: function () {
      return Object.keys(that.amounts);
    },
    setResourceAmount: function (type, amount) {
      that.amounts[type] = amount;
    },
    increaseResourceAmount: function (type, amount) {
      that.amounts[type] += amount;
    },
    decreaseResourceAmount: function (type, amount) {
      if (that.amounts[type] < amount) {
        throw new Errors.insufficientResourceAmountError(type, that.amounts[type], amount);
      }
      that.amounts[type] -= amount;
    },
    _factory: this
  };
}]);