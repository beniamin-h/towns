/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('ImmigrantsCampBuilding', ['Building', function (Building) {

  var ImmigrantsCampBuilding = function () {
    Building.apply(this, arguments);
  };

  ImmigrantsCampBuilding.prototype = Object.create(Building.prototype);
  ImmigrantsCampBuilding.prototype.constructor = ImmigrantsCampBuilding;

  ImmigrantsCampBuilding.prototype.name = 'Immigrants camp';
  ImmigrantsCampBuilding.prototype.code = 'ImmigrantsCamp';
  ImmigrantsCampBuilding.prototype.type = 'house';
  ImmigrantsCampBuilding.prototype.size = 1;
  ImmigrantsCampBuilding.prototype.construction_materials = {
    'grass': 10
  };

  return ImmigrantsCampBuilding;
}]);
