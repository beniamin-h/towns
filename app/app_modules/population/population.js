'use strict';

angular.module('towns.population', ['ui.bootstrap'])

.controller('PopulationCtrl', ['$scope', '$rootScope', 'populationProvider', 'Formatters',
    function($scope, $rootScope, populationProvider, Formatters) {


  // ------------------- INIT -------------------

  $scope._populationInit = function() {
    $scope.people = populationProvider.getAll();
  };

  // ------------------- LISTENERS -------------------

  //$scope.$on('enterBuildMode', function (event, building_class) {

  //});

  // ------------------- SCOPE METHODS -------------------

  $scope.populationListItemClicked = function (person) {
    $rootScope.$broadcast('populationListItemClicked', person);
  };

  $scope.floatToPercents = Formatters.floatToPercents;
  $scope.round = Formatters.round;

}]);
