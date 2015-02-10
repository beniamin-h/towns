'use strict';

angular.module('towns.government_info', [])

.controller('GovernmentInfo', ['$scope', '$rootScope', 'governmentInfoProvider', 'buildingsProvider',
    function($scope, $rootScope, governmentInfoProvider, buildingsProvider) {

  var selecting_new_building_position = false;

  // ------------------- INIT -------------------

  $scope._initGovernmentInfo = function() {
    $scope.active_menu = 'home';
  };

  // ------------------- LISTENERS -------------------

  $scope.$on('mapBlockClicked', function (event, block) {
    if (selecting_new_building_position) {
      if (!block.building) {
        buildingsProvider.build(governmentInfoProvider.getSelectedBuildingClass(),
          block.index, governmentInfoProvider.getGovernment());
        $scope.active_menu = 'build';
        selecting_new_building_position = false;
        $rootScope.$broadcast('leaveBuildMode');
      }
    } else {
      if (block.building) {
        $rootScope.$broadcast('buildingBlockClicked', block);
        $rootScope.$broadcast('mapBlockSelected', block);
      }
    }
  });

  // ------------------- SCOPE METHODS -------------------

  $scope.changeActiveMenu = function (menu) {
    $scope.active_menu = menu;
  };

  $scope.onBuildClicked = function (building_class) {
    selecting_new_building_position = true;
    governmentInfoProvider.setSelectedBuildingClass(building_class);
    $rootScope.$broadcast('enterBuildMode', building_class);
    $scope.changeActiveMenu('cancel');
  };

  $scope.onCancelClicked = function () {
    if (selecting_new_building_position) {
      selecting_new_building_position = false;
      $rootScope.$broadcast('leaveBuildMode');
      $scope.changeActiveMenu('build');
    }
  };

}]);