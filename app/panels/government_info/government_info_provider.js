'use strict';

angular.module('towns').factory('governmentInfoProvider', ['Government', function (Government) {
  var that = this;

  this.building_class = null;

  return {
    getGovernment: function () {
      return Government.getInstance();
    },
    setSelectedBuildingClass: function (building_class) {
      that.building_class = building_class;
    },
    getSelectedBuildingClass: function () {
      return that.building_class;
    },
    _factory: this
  };
}]);