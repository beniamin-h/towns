'use strict';

angular.module('towns.government_info', [])

.controller('GovernmentInfo', ['$scope', 'mapProvider', 'governmentInfoProvider',
    function($scope, mapProvider, governmentInfoProvider) {

  $scope.active_menu = { value: 'home' };
  governmentInfoProvider.setActiveMenuObj($scope.active_menu);

  $scope.changeActiveMenu = function (menu) {
    governmentInfoProvider.selectActiveMenu(menu);
  };

  $scope.onBuildClicked = function (building_class) {
    governmentInfoProvider.setSelectedBuildingClass(building_class);
    mapProvider.selectMask('select_new_building_position');
    $scope.changeActiveMenu('cancel');
  };

  $scope.onCancelClicked = function () {
    mapProvider.selectMask('select_map_block');
  };

}]);