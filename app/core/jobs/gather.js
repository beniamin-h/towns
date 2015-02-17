/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('GatherJob', ['Job', 'Environment', function (Job, Environment) {

  var GatherJob = function () {
    Job.apply(this, arguments);
  };

  GatherJob.prototype = Object.create(Job.prototype);
  GatherJob.prototype.constructor = GatherJob;

  GatherJob.prototype.name = 'Gather resources';

  GatherJob.prototype.can_do = function (person) {
    var parent_result = Job.prototype.can_do.apply(this, arguments);
    return true;
  };

  GatherJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    Environment

    this.current_progress += 0.1;
    if (this.current_progress >= 1.0) {
      this.finishJob();
    }
  };

  return GatherJob;
}]);
