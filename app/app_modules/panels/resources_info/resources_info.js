'use strict';

angular.module('towns.resources_info', ['ui.bootstrap'])

.controller('ResourcesInfo', ['$scope', 'resourcesProvider', function($scope, resourcesProvider) {
  $scope.getResourceAmount = resourcesProvider.getResourceAmount;
  $scope.resources_types = resourcesProvider.getAllResourcesTypes();

}]);