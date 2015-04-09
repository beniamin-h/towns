/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('SimpleFieldBuilding', ['Building', 'CultivateFieldJob', 'HarvestFieldJob',
    function (Building, CultivateFieldJob, HarvestFieldJob) {

  var SimpleFieldBuilding = function (map_index, owner) {
    Building.apply(this, arguments);

    this.available_jobs.push(new CultivateFieldJob(this, owner), new HarvestFieldJob(this, owner));
    this.cultivating_progress = 0;
    this.growing_progress = 0;
    this.harvesting_progress = 0;
    this.can_start_harvesing = false;
  };

  SimpleFieldBuilding.prototype = Object.create(Building.prototype);
  SimpleFieldBuilding.prototype.constructor = SimpleFieldBuilding;

  SimpleFieldBuilding.prototype.name = 'Simple field';
  SimpleFieldBuilding.prototype.code = 'SimpleField';
  SimpleFieldBuilding.prototype.type = 'farm';
  SimpleFieldBuilding.prototype.size = 1;
  SimpleFieldBuilding.prototype.spoil_rate = 0;
  SimpleFieldBuilding.prototype.construction_materials = {
    'grass': 10
  };

  SimpleFieldBuilding.prototype.operate = function () {
    Building.prototype.operate.apply(this, arguments);
    if (this.cultivating_progress > 0.9 && this.growing_progress < 1.0) {
      this.growing_progress += 0.25;
    }
    if (this.growing_progress >= 1.0 && !this.can_start_harvesing) {
      this.growing_progress = 1.0;
      this.can_start_harvesing = true;
      this.addCurrentlyAvailableJobsByClass(HarvestFieldJob);
    }
  };

  SimpleFieldBuilding.prototype.finish_constructing = function () {
    Building.prototype.finish_constructing.apply(this, arguments);
    this.addCurrentlyAvailableJobsByClass(CultivateFieldJob);
  };

  SimpleFieldBuilding.prototype.finish_harvesting = function () {
    this.growing_progress = 0.0;
    this.cultivating_progress = 0.0;
    this.harvesting_progress = 0.0;
    this.can_start_harvesing = false;
    this.addCurrentlyAvailableJobsByClass(CultivateFieldJob);
  };

  return SimpleFieldBuilding;
}]);
