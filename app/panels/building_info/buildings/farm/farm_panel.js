'use strict';

angular.module('towns.building_info')

.controller('FarmPanel', ['$scope', 'mapProvider', 'Formatters',
    function($scope, mapProvider, Formatters) {

  $scope.getBuilding = function () {
    return mapProvider.getSelectedBlock().building;
  };

  $scope.floatToPercents = function () {
    return Formatters.floatToPercents.apply(Formatters, arguments);
  }

}]);