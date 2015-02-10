'use strict';

angular.module('towns.government_info', [])

.controller('GovernmentInfo', ['$scope', '$rootScope', 'Government', 'buildingsProvider',
    function($scope, $rootScope, Government, buildingsProvider) {

  var selected_building_class;

  // ------------------- INIT -------------------

  $scope._initGovernmentInfo = function() {
    $scope.active_menu = 'home';
  };

  // ------------------- LISTENERS -------------------

  $scope.$on('newBuildingPositionSelected', function (event, block) {
    if (!block.building) {
      buildingsProvider.build(selected_building_class, block.index, Government.getInstance());
      $scope.active_menu = 'build';
      $rootScope.$broadcast('leaveBuildMode');
    }
  });

  // ------------------- SCOPE METHODS -------------------

  $scope.changeActiveMenu = function (menu) {
    $scope.active_menu = menu;
  };

  $scope.onBuildClicked = function (building_class) {
    selected_building_class = building_class;
    $rootScope.$broadcast('enterBuildMode', building_class);
    $scope.changeActiveMenu('cancel');
  };

  $scope.onCancelClicked = function (prev_menu) {
    if (prev_menu == 'build') {
      $rootScope.$broadcast('leaveBuildMode');
      $scope.changeActiveMenu('build');
    }
  };

}]);