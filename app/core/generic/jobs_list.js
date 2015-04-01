/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('JobsList', ['Resources', function (Resources) {

  var JobsList = function () {
    this.jobs = [];
  };

  JobsList.prototype.removeJob = function (job) {
    var index = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);
  };

  JobsList.prototype.addJob = function (job) {
    this.jobs.push(job);
    Resources.regenerateResourcesObtainableJobs(); // TODO: not here !!
  };

  JobsList.prototype.getAvailableJobs = function (person) {
    for (var i = 0, jobs = []; i < this.jobs.length; i++) {
      if (!this.jobs[i].worker && this.jobs[i].can_do(person)) {
        jobs.push(this.jobs[i]);
      }
    }
    return jobs;
  };

  JobsList.prototype.clearDoneJobs = function () {
    for (var i = this.jobs.length - 1; i >= 0; i--) {
      if(this.jobs[i].current_progress >= 1.0) {
        this.jobs[i].finishJob();
      }
    }
    Resources.regenerateResourcesObtainableJobs();
  };

  var jobs_list = new JobsList();

  return {
    addJob: function (job) {
      jobs_list.addJob(job);
    },
    removeJob: function (job) {
      jobs_list.removeJob(job);
    },
    getAvailableJobs: function (person) {
      return jobs_list.getAvailableJobs(person);
    },
    getAllJobs: function () {
      return jobs_list.jobs;
    },
    clearDoneJobs: function () {
      jobs_list.clearDoneJobs();
    },
    getInstance: function () {
      return jobs_list;
    }
  };
}]);


