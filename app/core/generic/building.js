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
    JobsList.addJob(new BuildJob(this, this.owner));
  };

  Building.prototype.finish_constructing = function () {

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
