'use strict';

angular.module('towns').factory('governmentInfoProvider', ['Government', function (Government) {
  var that = this;

  this.active_menu_obj = null;
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
    setActiveMenuObj: function (obj) {
      that.active_menu_obj = obj;
    },
    selectActiveMenu: function (menu) {
      that.active_menu_obj.value = menu;
    },
    _factory: this
  };
}]);