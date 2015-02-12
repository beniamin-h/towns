'use strict';

angular.module('towns.environment', ['ui.bootstrap'])

.controller('EnvironmentCtrl', ['$scope', '$rootScope', 'environmentProvider',
    function($scope, $rootScope, environmentProvider) {


  // ------------------- INIT -------------------

  $scope._environmentInit = function() {
    $scope.blocks = environmentProvider.getAllBlocks();
  };

  // ------------------- LISTENERS -------------------

  //$scope.$on('enterBuildMode', function (event, building_class) {

  //});

  // ------------------- SCOPE METHODS -------------------

  $scope.envBlockClicked = function (block) {
    $rootScope.$broadcast('envBlockClicked', block);
  };

  $scope.onEnvBlockHovered = function (block) {
    $rootScope.$broadcast('envBlockHovered', block);
  };

  $scope.onEnvMapLeave = function (block) {
    $rootScope.$broadcast('envMapLeft', block);
  };
}]);
