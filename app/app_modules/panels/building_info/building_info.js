'use strict';

angular.module('towns.building_info', ['ui.bootstrap'])

.controller('BuildingInfo', ['$scope', '$rootScope', 'Math', 'Formatters',
    function($scope, $rootScope, Math, Formatters) {

  var selected_building;

  // ------------------- INIT -------------------

  $scope._initBuildingInfo = function() {

  };

  // ------------------- LISTENERS -------------------

  $scope.$on('buildingSelected', function (event, building) {
    selected_building = building;
  });

  // ------------------- SCOPE METHODS -------------------

  $scope.getSelectedBuilding = function () {
    return selected_building || {};
  };

  $scope.getBuildingConstructingProgress = function () {
    if (selected_building) {
      var progress = selected_building.constructing_progress;
      return progress < 1.0 ? ['(constructing: ', Math.round(progress * 100), '%)'].join('') : '';
    }
  };

  $scope.personClicked = function (person) {
    $scope.selectedPerson = person;
    $rootScope.$broadcast('personSelected', person);
  };

  $scope.floatToPercents = function () {
    return Formatters.floatToPercents.apply(Formatters, arguments);
  };

  $scope.getNeedFulfilmentColor = function (need_fulfilment) {
    return need_fulfilment > 0.5 ? 'green' : (need_fulfilment > 0.3 ? '' : 'red');
  };

}]);