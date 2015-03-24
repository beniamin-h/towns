'use strict';

angular.module('towns.resources_info', ['ui.bootstrap'])

.controller('ResourcesInfo', ['$scope', 'governmentStorage', function($scope, governmentStorage) {
  $scope.resources = governmentStorage.getResources();

}]);