/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('EnvironmentBlock', function () {

  var EnvironmentBlock = function (map_index, owner) {
    this.owner = owner;
    this.map_index = map_index;
    this.available_jobs = [];
    this.resources = {};
  };

  EnvironmentBlock.prototype.type = null;
  EnvironmentBlock.prototype.owner = null;
  EnvironmentBlock.prototype.map_index = -1;
  EnvironmentBlock.prototype.available_jobs = [];
  EnvironmentBlock.prototype.resources = {};

  EnvironmentBlock.prototype.gatherResources = function (person) {

  };

  EnvironmentBlock.prototype.operate = function () {

  };

  return EnvironmentBlock;
});
