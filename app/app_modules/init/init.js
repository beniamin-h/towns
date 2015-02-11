'use strict';

angular.module('towns.init', [])

.controller('InitCtrl', ['populationProvider', 'buildingsProvider', 'mapProvider',
                         'environmentProvider', 'PopulationConfig',
                         '$interval', '$rootScope',
    function(populationProvider, buildingsProvider, mapProvider, environmentProvider, PopulationConfig,
             $interval, $rootScope) {

  mapProvider.initMap();
  environmentProvider.initEnvironment();
  buildingsProvider.initBuildingsProvider();

  populationProvider.setupInitialPopulation(PopulationConfig.initial_population_count);
  buildingsProvider.setupInitialBuildings(
    populationProvider.getAll(), mapProvider.getAllBlocks(), [
      Math.floor(mapProvider.getWidth() * 0.15), Math.floor(mapProvider.getHeight() * 0.15),
      Math.floor(mapProvider.getWidth() * 0.70), Math.floor(mapProvider.getHeight() * 0.70)]);

  $interval(function () {
    populationProvider.processTick();
    buildingsProvider.processTick();
  }, 1000);
}]);