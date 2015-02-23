'use strict';

// Declare app level module which depends on views, and components
angular.module('towns', [
  'ngRoute',
  'towns.init',
  'towns.layout',
  'towns.map',
  'towns.environment',
  'towns.population',
  'towns.main_panel',
  'towns.prop_panel',
  'towns.population_info',
  'towns.resources_info',
  'towns.building_info',
  'towns.government_info',
  'towns.environment_info'
]);