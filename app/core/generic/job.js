/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Job', ['JobsList', function (JobsList) {

  var Job = function (workplace, giver) {
    this.workplace = workplace;
    this.giver = giver;
    this.readable_name = this.name;
  };

  Job.prototype.name = '';
  Job.prototype.readable_name = '';
  Job.prototype.workplace = null;
  Job.prototype.giver = null;
  Job.prototype.worker = null;
  Job.prototype.current_progress = 0;
  Job.prototype.base_progress_increase = 0.1;
  Job.prototype.required_materials = {};
  Job.prototype.required_skills = {};

  Job.prototype.can_do = function (person) {
    return this.giver == person || !this.giver || !this.giver.isInterestedInJob(this);
  };

  Job.prototype.setWorker = function (worker) {
    this.worker = worker;
  };

  Job.prototype.finishJob = function () {
    this.current_progress = 0;
    this.worker.changeJob(null);
  };

  Job.prototype['do'] = function (person) {

  };

  return Job;
}]);
