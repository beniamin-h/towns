/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('EnvironmentBlock', ['Environment', 'JobsList',
    'GatherFruitsJob', 'GatherVegetablesJob', 'Resources',
  function (Environment, JobsList, GatherFruitsJob, GatherVegetablesJob, Resources) {

  var EnvironmentBlock = function (map_index, is_player_town_env_block) {
    this.map_index = map_index;
    this.resources = Environment.getEnvResourcesInitialAmounts();
    if (is_player_town_env_block) {
      this.code = 'town';
      this.setExplored();
    }
  };

  EnvironmentBlock.prototype.map_index = -1;
  EnvironmentBlock.prototype.resources = {};
  EnvironmentBlock.prototype.explored = false;
  EnvironmentBlock.prototype.code = '';
  EnvironmentBlock.prototype.gather_base_divisor = 1000;
  EnvironmentBlock.prototype.max_gather_amount = 10;

  EnvironmentBlock.prototype.getMaxResourcesAmountsFromGathering = function (person) {
    var gathered_amounts = {},
      gathered_from = {};
    for (var res_name in this.resources) {
      if (!this.resources[res_name]) {
        continue;
      }

      var gather_amount = this._calculateGatherAmount(
        this._calculateGatherRatio(
          this._calculateGatherEnvRatio(
            this.resources[res_name], Environment.getEnvResourceInfo(res_name).max_amount),
          this._calculateGatherPersonRatio(person)),
        this.resources[res_name]);

      for (var obtainable_resource_name in Environment.getEnvResourceInfo(res_name).obtainable_resources) {
        gathered_amounts[obtainable_resource_name] = gathered_amounts[obtainable_resource_name] || 0;
        var res_amount = gather_amount *
          Environment.getEnvResourceInfo(res_name).obtainable_resources[obtainable_resource_name] *
          Resources.getResourceInfo(obtainable_resource_name).gathering_accessibility;
        if (res_amount > gathered_amounts[obtainable_resource_name]) {
          gathered_amounts[obtainable_resource_name] = res_amount;
          gathered_from[obtainable_resource_name] = res_name;
        }
      }
    }

    return {
      gathered_amounts: gathered_amounts,
      gathered_from: gathered_from
    };
  };

  EnvironmentBlock.prototype.gatherResources = function (person, res_name) {
    var gathered_amounts = {};
    if (!this.resources[res_name]) {
      return gathered_amounts;
    }

    var gather_amount = this._calculateGatherAmount(
      this._calculateGatherRatio(
        this._calculateGatherEnvRatio(
          this.resources[res_name], Environment.getEnvResourceInfo(res_name).max_amount),
        this._calculateGatherPersonRatio(person)),
      this.resources[res_name]);

    this.resources[res_name] -= gather_amount * (Math.random() * 0.5 + 0.75);
    for (var obtainable_resource_name in Environment.getEnvResourceInfo(res_name).obtainable_resources) {
      gathered_amounts[obtainable_resource_name] = gather_amount *
        Environment.getEnvResourceInfo(res_name).obtainable_resources[obtainable_resource_name] *
          Resources.getResourceInfo(obtainable_resource_name).gathering_accessibility *
        (Math.random() * 0.5 + 0.5);
    }

    return gathered_amounts;
  };

  EnvironmentBlock.prototype._calculateGatherEnvRatio = function (resource_amount, resource_max_amount) {
    return resource_amount / resource_max_amount;
  };

  EnvironmentBlock.prototype._calculateGatherPersonRatio = function (person) {
    return person.strength;
  };

  EnvironmentBlock.prototype._calculateGatherRatio = function (gather_env_ratio, gather_person_ratio) {
    return (gather_env_ratio * (1 - gather_env_ratio) + gather_env_ratio) * gather_person_ratio;
  };

  EnvironmentBlock.prototype._calculateGatherAmount = function (gather_ratio, res_amount) {
    var gather_amount = gather_ratio * res_amount / this.gather_base_divisor;
    gather_amount = gather_amount > this.max_gather_amount ? this.max_gather_amount : gather_amount;
    gather_amount = gather_amount > res_amount ? res_amount : gather_amount;
    return gather_amount;
  };

  EnvironmentBlock.prototype.setExplored = function () {
    this.explored = true;
    JobsList.addJob(new GatherFruitsJob(this, null));
    JobsList.addJob(new GatherVegetablesJob(this, null));
  };

  EnvironmentBlock.prototype.operate = function () {

  };

  return EnvironmentBlock;
}]);
