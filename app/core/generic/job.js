/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Job', ['JobsList', 'IdGenerator', function (JobsList, IdGenerator) {

  var Job = function (workplace, giver) {
    this.workplace = workplace;
    this.giver = giver;
    this._class = Job;
    this.job_id = IdGenerator.nextInt();
  };

  Job.prototype.name = '';
  Job.prototype.workplace = null;
  Job.prototype.giver = null;
  Job.prototype.worker = null;
  Job.prototype.current_progress = 0;
  Job.prototype.base_progress_increase = 0.1;
  Job.prototype.required_materials = {};
  Job.prototype.required_skills = {};
  Job.prototype.obtainable_resources = [];
  Job.prototype.is_auto_created_job = false;
  Job.prototype.salary = 0;
  Job.prototype.job_id = 0;

  Job.prototype.can_do = function (person) {
    return true;
  };

  Job.prototype.setWorker = function (worker) {
    this.worker = worker;
    if (worker && this.is_auto_created_job) {
      JobsList.addJob(new (this._class)(this.workplace, this.giver));
    }
  };

  Job.prototype.finishJob = function () {
    this.current_progress = 0;
    this.worker.changeJob(null);
    JobsList.removeJob(this);
  };

  Job.prototype['do'] = function (person) {

  };

  return Job;
}]);
