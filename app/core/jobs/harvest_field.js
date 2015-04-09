/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('HarvestFieldJob', ['Job', function (Job) {

  var HarvestFieldJob = function () {
    Job.apply(this, arguments);
    this._class = HarvestFieldJob;
  };

  HarvestFieldJob.prototype = Object.create(Job.prototype);
  HarvestFieldJob.prototype.constructor = HarvestFieldJob;

  HarvestFieldJob.prototype.name = 'Harvesting a field';
  HarvestFieldJob.prototype.base_progress_increase = 0.25;
  HarvestFieldJob.prototype.salary = 1;
  HarvestFieldJob.prototype.obtainable_resources = {
    'straw': 1.0,
    'grains': 0.1
  };

  HarvestFieldJob.prototype.can_do = function (person) {
    var parent_result = Job.prototype.can_do.apply(this, arguments);

    return parent_result && this.workplace.harvesting_progress < 1.0;
  };

  HarvestFieldJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    this.workplace.harvesting_progress += this.base_progress_increase;
    this.workplace.harvesting_progress = Math.min(this.workplace.harvesting_progress, 1.0);
    this.current_progress = this.workplace.harvesting_progress;
  };

  HarvestFieldJob.prototype.finishJob = function () {
    Job.prototype.finishJob.apply(this, arguments);
    this.workplace.finish_harvesting();
  };

  return HarvestFieldJob;
}]);
