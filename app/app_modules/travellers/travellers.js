'use strict';

angular.module('towns.travellers', ['ui.bootstrap'])

.controller('TravellersCtrl', ['$scope', '$rootScope', 'populationProvider', 'Formatters',
    function($scope, $rootScope, populationProvider, Formatters) {



  // ------------------- INIT -------------------

  $scope._populationInit = function() {
    $scope.people = populationProvider.getAll();
    $scope.selected_person = null;
  };

  // ------------------- LISTENERS -------------------

  //$scope.$on('enterBuildMode', function (event, building_class) {

  //});

  // ------------------- SCOPE METHODS -------------------

  $scope.populationListItemClicked = function (person) {
    $scope.selected_person = person;
    $rootScope.$broadcast('populationListItemClicked', person);
  };

  $scope.floatToPercents = Formatters.floatToPercents;
  $scope.round = Formatters.round;

}]);
