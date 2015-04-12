/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('StoragePlaceBuilding', [
  'Building', 'JobsList', 'Resources', 'GatherFruitsToStoreJob', 'GatherVegetablesToStoreJob',
    function (Building, JobsList, Resources, GatherFruitsToStoreJob, GatherVegetablesToStoreJob) {

  var StoragePlaceBuilding = function (map_index, owner) {
    Building.apply(this, arguments);
    this.initResources();
  };

  StoragePlaceBuilding.prototype = Object.create(Building.prototype);
  StoragePlaceBuilding.prototype.constructor = StoragePlaceBuilding;

  StoragePlaceBuilding.prototype.name = 'Storage place';
  StoragePlaceBuilding.prototype.code = 'StoragePlace';
  StoragePlaceBuilding.prototype.type = 'store_house';
  StoragePlaceBuilding.prototype.size = 1;
  StoragePlaceBuilding.prototype.spoil_rate = 0;
  StoragePlaceBuilding.prototype.construction_materials = {};
  StoragePlaceBuilding.prototype.resources = {};
  StoragePlaceBuilding.prototype.requestedResourcesAmounts = {};
  StoragePlaceBuilding.prototype.requestedResourcesCollectors = {};
  StoragePlaceBuilding.prototype.jobsPerResource = {};
  StoragePlaceBuilding.prototype.resourceToJobClassMapping = {
    fruits: GatherFruitsToStoreJob,
    vegetables: GatherVegetablesToStoreJob
  };

  StoragePlaceBuilding.prototype.initResources = function ( ) {
    this.resources = {};
    this.requestedResourcesAmounts = {};
    this.requestedResourcesCollectors = {};
    this.jobsPerResource = {};
    for (var res_name in Resources.getResourcesInfo()) {
      this.resources[res_name] = 0;
      this.requestedResourcesAmounts[res_name] = 0;
      this.requestedResourcesCollectors[res_name] = 0;
      this.jobsPerResource[res_name] = [];
    }
  };

  StoragePlaceBuilding.prototype.setRequestedResourceAmount = function (
      resource_name, max_collectors_number, max_gather_resource_amount) {

    this.requestedResourcesAmounts[resource_name] = max_gather_resource_amount;
    this.requestedResourcesCollectors[resource_name] = max_collectors_number;

    if (this.resources[resource_name] < this.requestedResourcesAmounts[resource_name]) {
      for (var i = this.jobsPerResource[resource_name].length; i < max_collectors_number; i++) {
        var job = new (this.resourceToJobClassMapping[resource_name])(this, this.owner);
        JobsList.addJob(job);
        this.jobsPerResource[resource_name].push(job);
      }
    }

    if (this.jobsPerResource[resource_name].length > max_collectors_number) {
      for (var j = this.jobsPerResource[resource_name].length - 1; j >= 0; j--) {
        var _job = this.jobsPerResource[resource_name][j];
        if (!_job.worker) {
          this.jobsPerResource[resource_name].splice(j, 1);
          JobsList.removeJob(_job);
          if (this.jobsPerResource[resource_name].length <= max_collectors_number) {
            break;
          }
        }
      }
    }
  };

  return StoragePlaceBuilding;
}]);
