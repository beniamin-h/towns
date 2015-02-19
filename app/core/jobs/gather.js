/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('GatherJob', ['Job', function (Job) {

  var GatherJob = function () {
    Job.apply(this, arguments);
  };

  GatherJob.prototype = Object.create(Job.prototype);
  GatherJob.prototype.constructor = GatherJob;

  GatherJob.prototype.name = 'Gather resources';
  GatherJob.prototype.base_progress_increase = 0.1;

  GatherJob.prototype.can_do = function (person) {
    var parent_result = Job.prototype.can_do.apply(this, arguments);
    return true;
  };

  GatherJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    this.current_progress += this.base_progress_increase;

    if (this.current_progress >= 1.0) {
      var gathered_resources = person.current_env_block.gatherResources(person);

      for (var res_name in gathered_resources) {
        person.resources[res_name] = person.resources[res_name] || 0;
        person.resources[res_name] += gathered_resources[res_name];
      }
      this.finishJob();
    }
  };

  return GatherJob;
}]);
