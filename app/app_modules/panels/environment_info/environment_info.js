'use strict';

angular.module('towns.environment_info', ['ui.bootstrap'])

.controller('EnvironmentInfo', ['$scope', 'Math', function($scope, Math) {

  var selected_block, block_clicked = false;

  // ------------------- LISTENERS -------------------

  $scope.$on('envBlockHovered', function (event, block) {
    if (!block_clicked) {
      selected_block = block;
    }
  });

  $scope.$on('envBlockClicked', function (event, block) {
    block_clicked = !block_clicked;
    selected_block = block;
  });

  $scope.$on('envMapLeft', function (event) {
    if (!block_clicked) {
      selected_block = null;
    }
  });

  // ------------------- SCOPE METHODS -------------------

  $scope.getSelectedEnvironmentBlockResources = function () {
    return selected_block && selected_block.explored &&
      selected_block.resources || {};
  };

  $scope.roundAmount = function (amount) {
    return Math.round(amount);
  };

}]);