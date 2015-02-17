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
  EnvironmentBlock.prototype.explored = false;
  EnvironmentBlock.prototype.code = '';

  EnvironmentBlock.prototype.gatherResources = function (person) {
    var gathered_resources = {};
    for (var res_name in this.resources) {
      if (!this.resources[res_name]) {
        continue;
      }
      var gather_env_ratio = this.resources[res_name] / Environment.getResourceInfo(res_name).max_amount * 10;
      for (var exploitable_resource_name in Environment.getResourceInfo(res_name).exploitable_resources) {
        gathered_resources[exploitable_resource_name] = gathered_resources[exploitable_resource_name] || 0;
        gathered_resources[exploitable_resource_name] += gather_env_ratio *
          Environment.getResourceInfo(res_name).exploitable_resources[exploitable_resource_name];
        if (gather_env_ratio <= this.resources[res_name]) {
          this.resources[res_name] -= gather_env_ratio;
        } else {
          this.resources[res_name] = 0;
        }
      }
    }

    return gathered_resources;
  };

  EnvironmentBlock.prototype.operate = function () {

  };

  return EnvironmentBlock;
}]);
