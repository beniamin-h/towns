'use strict';

angular.module('towns').factory('buildingsProvider', [
  'ImmigrantsCampBuilding', 'SimpleFieldBuilding', 'StoragePlaceBuilding', 'Math', 'mapProvider',
    function (ImmigrantsCampBuilding, SimpleFieldBuilding, StoragePlaceBuilding, Math, mapProvider) {
  var that = this;

  this.initBuildingsProvider = function () {
    that.buildings = {};
    that.buildingsClasses = {};
    that._initBuildingsClasses();
  };

  this._initBuildingsClasses = function () {
    [ImmigrantsCampBuilding, SimpleFieldBuilding, StoragePlaceBuilding].forEach(function (building_class) {
      that.buildingsClasses[building_class.prototype.code] = building_class;
    });
  };

  this.processTick = function () {
    for (var building in that.buildings) {
      if (that.buildings.hasOwnProperty(building)) {
        that.buildings[building].operate();
      }
    }
  };

  return {
    _getBuildingClassByString: function (class_string) { // Not used
      return that.buildingsClasses[class_string];
    },
    getAll: function () {
      return that.buildings;
    },
    getAt: function (index) {
      return that.buildings[index];
    },
    initBuildingsProvider: function () {
      that.initBuildingsProvider();
    },
    setupInitialBuildings: function (people, map_blocks, rect_dims_list) {
      for (var i = 0, map_index; i < people.length; i++) {
        map_index = mapProvider.getEmptyRandomBlockIndexWithinRect.apply(mapProvider, rect_dims_list);
        map_blocks[map_index].building = that.buildings[map_index] = new ImmigrantsCampBuilding(
          map_index, people[i], true);
        map_blocks[map_index].building.add_inhabitant(people[i]);
        if (Math.random() > 0.5 && i < people.length - 1) {
          map_blocks[map_index].building.add_inhabitant(people[++i]);
        }
      }
    },
    build: function (_class, index, owner) {
      var buildingClass = that.buildingsClasses[_class];
      that.buildings[index] = new buildingClass(index, owner);
      mapProvider.setBlockBuilding(index, that.buildings[index]);
    },
    processTick: function() {
      that.processTick();
    },
    _instance: this
  };
}]);