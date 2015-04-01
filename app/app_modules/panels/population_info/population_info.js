'use strict';

angular.module('towns.population_info', ['ui.bootstrap'])

.controller('PopulationInfo', ['$scope', 'populationProvider', function($scope, populationProvider) {
  $scope.population = populationProvider;
  $scope.selected_person = null;

  // ------------------- LISTENERS -------------------
  $scope.$on('populationListItemClicked', function (event, person) {
    $scope.selected_person = person;
  });

}]);