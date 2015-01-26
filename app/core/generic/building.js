/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Building', ['BuildJob', 'JobsList', function (BuildJob, JobsList) {

  var Building = function (map_index, owner, constructed) {
    this.owner = owner;
    this.map_index = map_index;
    this.inhabitants = [];
    this.available_jobs = [];
    this.currently_available_jobs = [];
    if (constructed) {
      this.constructing_progress = 1.0;
    } else {
      this.start_constructing();
    }
  };

  Building.prototype.name = '';
  Building.prototype.owner = null;
  Building.prototype.inhabitants = [];
  Building.prototype.size = 0;
  Building.prototype.type = null;
  Building.prototype.constructing_progress = 0.0;
  Building.prototype.condition = 1.0;
  Building.prototype.spoil_rate = 0.01;
  Building.prototype.map_index = -1;
  Building.prototype.available_jobs = [];
  Building.prototype.currently_available_jobs = [];
  Building.prototype.construction_materials = {};

  Building.prototype.start_constructing = function () {
    this.addNewCurrentlyAvailableJobsByClass(BuildJob, this.size);
  };

  Building.prototype.finish_constructing = function () {
    this.constructing_progress = 1.0;
    this.removeAvailableJobsByClass(BuildJob);
  };

  Building.prototype.addNewCurrentlyAvailableJobsByClass = function (_class, count) {
    for (var i = 0, newJob; i < count; i++) {
      newJob = new _class(this, this.owner);
      this.currently_available_jobs.push(newJob);
      JobsList.addJob(newJob);
    }
  };

  Building.prototype.removeAvailableJobsByClass = function (_class) {
    for (var i = this.currently_available_jobs.length - 1; i >= 0; i--) {
      if (this.currently_available_jobs[i] instanceof _class) {
        JobsList.removeJob(this.currently_available_jobs.splice(i, 1)[0]);
      }
    }
  };

  Building.prototype.deactivateCurrentlyAvailableJobsByClass = function (_class) {
    for (var i = this.currently_available_jobs.length - 1; i >= 0; i--) {
      if (this.currently_available_jobs[i] instanceof _class) {
        JobsList.removeJob(this.currently_available_jobs.splice(i, 1)[0]);
      }
    }
  };

  Building.prototype.addCurrentlyAvailableJobsByClass = function (_class) {
    for (var newJob, j = this.available_jobs.length - 1; j >= 0; j--) {
      if (this.available_jobs[j] instanceof _class) {
        newJob = this.available_jobs[j];
        this.currently_available_jobs.push(newJob);
        JobsList.addJob(newJob);
      }
    }
  };

  Building.prototype.add_inhabitant = function (inhabitant) {
    this.inhabitants.push(inhabitant);
  };

  Building.prototype.spoil = function () {
    this.condition -= this.spoil_rate;
  };

  Building.prototype.operate = function () {
    this.spoil();
  };

  return Building;
}]);
