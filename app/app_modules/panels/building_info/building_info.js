'use strict';

angular.module('towns.building_info', ['ui.bootstrap'])

.controller('BuildingInfo', ['$scope', 'mapProvider', 'populationProvider', 'Math', 'Formatters',
    function($scope, mapProvider, populationProvider, Math, Formatters) {
  $scope.getSelectedBlock = function () {
    return mapProvider.getSelectedBlock();
  };

  $scope.getBuildingConstructingProgress = function () {
    if (mapProvider.getSelectedBlock()) {
      var progress = mapProvider.getSelectedBlock().building.constructing_progress;
      return progress < 1.0 ? ['(constructing: ', Math.round(progress * 100), '%)'].join('') : '';
    }
  };

  $scope.personClicked = function (person) {
    $scope.selectedPerson = person;
    populationProvider.selectPerson(person);
  };

  $scope.floatToPercents = function () {
    return Formatters.floatToPercents.apply(Formatters, arguments);
  }

  $scope.getNeedFulfilmentColor = function (need_fulfilment) {
    return need_fulfilment > 0.5 ? 'green' : (need_fulfilment > 0.3 ? '' : 'red');
  };

}]);