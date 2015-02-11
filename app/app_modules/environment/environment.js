'use strict';

angular.module('towns.environment', ['ui.bootstrap'])

.controller('EnvironmentCtrl', ['$scope', '$rootScope', 'environmentProvider',
    function($scope, $rootScope, environmentProvider) {

  var select_block = function (block) {
    $scope.selected_block = block;
  };

  // ------------------- INIT -------------------

  $scope._environmentMap = function() {
    $scope.blocks = environmentProvider.getAllBlocks();
  };

  // ------------------- LISTENERS -------------------

  //$scope.$on('enterBuildMode', function (event, building_class) {

  //});

  // ------------------- SCOPE METHODS -------------------

  $scope.envBlockClicked = function (block) {
    select_block(block);
  };
}]);
