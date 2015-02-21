'use strict';

angular.module('towns').factory('initProvider', ['populationProvider', 'buildingsProvider', 'mapProvider',
                         'environmentProvider', 'PopulationConfig', '$interval',
    function(populationProvider, buildingsProvider, mapProvider, environmentProvider, PopulationConfig,
             $interval) {
  var that = this;

  return {
    initGenericProviders: function () {
      mapProvider.initMap();
      environmentProvider.initEnvironment();
      buildingsProvider.initBuildingsProvider();
    },
    setupInitialInstances: function () {
      populationProvider.setupInitialPopulation(PopulationConfig.initial_population_count);
      buildingsProvider.setupInitialBuildings(
        populationProvider.getAll(), mapProvider.getAllBlocks(), [
          Math.floor(mapProvider.getWidth() * 0.15), Math.floor(mapProvider.getHeight() * 0.15),
          Math.floor(mapProvider.getWidth() * 0.70), Math.floor(mapProvider.getHeight() * 0.70)]);
    },
    setupTickProcessInterval: function () {
      var self = this;
      $interval(function () {
        //var now = new Date();
        self.processTicks();
        //console.log(new Date() - now);
      }, 1000);
    },
    processTicks: function () {
      populationProvider.processTick();
      buildingsProvider.processTick();
    },
    _factory: this
  };
}]);