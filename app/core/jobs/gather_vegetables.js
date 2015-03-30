/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('GatherVegetablesJob', ['Job', 'Resources', 'LocalMarket', 'Math',
  function (Job, Resources, LocalMarket, Math) {

  var GatherVegetablesJob = function () {
    Job.apply(this, arguments);
    this.current_gathering_resource = null;
  };

  GatherVegetablesJob.prototype = Object.create(Job.prototype);
  GatherVegetablesJob.prototype.constructor = GatherVegetablesJob;

  GatherVegetablesJob.prototype.name = 'Gather vegetables';
  GatherVegetablesJob.prototype.base_progress_increase = 1.0;
  GatherVegetablesJob.prototype.obtainable_resources = {
    vegetables: 1.0
  };

  GatherVegetablesJob.prototype.can_do = function (person) {
    var parent_result = Job.prototype.can_do.apply(this, arguments);
    return parent_result;
  };

  GatherVegetablesJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    if (this.current_progress == 0) {
      this.current_gathering_resource = 'vegetables';
    }

    this.current_progress += this.base_progress_increase;

    if (this.current_progress >= 1.0) {
      var gathered_resources = person.current_env_block.gatherResources(
        person, this.current_gathering_resource);

      for (var res_name in gathered_resources) {
        person.resources[res_name] = person.resources[res_name] || 0; // TODO: defaulting to 0 not here !!
        person.resources[res_name] += gathered_resources[res_name];
      }
    }

  };

  return GatherVegetablesJob;
}]);
