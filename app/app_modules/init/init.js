'use strict';

angular.module('towns.init', [])

.controller('InitCtrl', ['initProvider', function(initProvider) {

  initProvider.initGenericProviders();
  initProvider.setupInitialInstances();
  initProvider.setupTickProcessInterval();

}]);