/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('EnvironmentBlock', ['Environment', function (Environment) {

  var EnvironmentBlock = function (map_index) {
    this.map_index = map_index;
    this.resources = Environment.getResourcesInitialAmounts();
  };

  EnvironmentBlock.prototype.map_index = -1;
  EnvironmentBlock.prototype.resources = {};

  EnvironmentBlock.prototype.gatherResources = function (person) {

  };

  EnvironmentBlock.prototype.operate = function () {

  };

  return EnvironmentBlock;
}]);
