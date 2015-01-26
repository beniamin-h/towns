/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('BuildJob', ['Job', function (Job) {

  var BuildJob = function (workplace, giver) {
    Job.apply(this, arguments);
  };

  BuildJob.prototype = Object.create(Job.prototype);
  BuildJob.prototype.constructor = BuildJob;

  BuildJob.prototype.name = 'Constructing a building';

  BuildJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    //TODO: this.construction_materials
    this.workplace.constructing_progress += 0.3334;
    this.current_progress = this.workplace.constructing_progress;
    if (this.workplace.constructing_progress >= 1.0) {
      this.workplace.finish_constructing();
      this.finishJob();
    }
  };

  return BuildJob;
}]);
