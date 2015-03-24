/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('GatherFruitsJob', ['Job', 'Resources', 'LocalMarket', 'Math',
  function (Job, Resources, LocalMarket, Math) {

  var GatherFruitsJob = function () {
    Job.apply(this, arguments);
    this.current_gathering_resource = null;
  };

  GatherFruitsJob.prototype = Object.create(Job.prototype);
  GatherFruitsJob.prototype.constructor = GatherFruitsJob;

  GatherFruitsJob.prototype.name = 'Gather fruits';
  GatherFruitsJob.prototype.base_progress_increase = 0.25;

  GatherFruitsJob.prototype.can_do = function (person) {
    var parent_result = Job.prototype.can_do.apply(this, arguments);
    return parent_result;
  };

  GatherFruitsJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    if (this.current_progress == 0) {
      this.current_gathering_resource = 'fruits';
    }

    this.current_progress += this.base_progress_increase;

    if (this.current_progress >= 1.0) {
      var gathered_resources = person.current_env_block.gatherResources(
        person, this.current_gathering_resource);

      for (var res_name in gathered_resources) {
        person.resources['food'] = person.resources['food'] || 0; // TODO: not food !!
        person.resources['food'] += gathered_resources[res_name];
      }
      this.finishJob();
    }
  };

  return GatherFruitsJob;
}]);
