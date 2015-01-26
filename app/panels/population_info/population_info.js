'use strict';

angular.module('towns.population_info', ['ui.bootstrap'])

.controller('PopulationInfo', ['$scope', 'populationProvider', function($scope, populationProvider) {
  $scope.population = populationProvider;

}]);