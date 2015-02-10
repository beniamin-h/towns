'use strict';

angular.module('towns').factory('environmentProvider', ['Environment', 'EnvironmentConfig',
    function (Environment, EnvironmentConfig) {
  var that = this;


  return {
    initEnvironment: function () {

    },
    _factory: this
  };
}]);