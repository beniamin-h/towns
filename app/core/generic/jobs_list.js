/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('JobsList', function () {

  var JobsList = function () {
    this.jobs = [];
  };

  JobsList.prototype.removeJob = function (job) {
    var index = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);
  };

  JobsList.prototype.addJob = function (job) {
    this.jobs.push(job);
  };

  JobsList.prototype.getAvailableJobs = function (person) {
    for (var i = 0, jobs = []; i < this.jobs.length; i++) {
      if (!this.jobs[i].worker && this.jobs[i].can_do(person)) {
        jobs.push(this.jobs[i]);
      }
    }
    return jobs;
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
    }
  };
});


