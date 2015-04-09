/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('PersonDecider', ['LocalMarket', 'JobsList', 'Math', 'governmentStorage', 'Resources',
    function (LocalMarket, JobsList, Math, governmentStorage, Resources) {

  var PersonDecider = function (localMarket) {

  };

  PersonDecider.prototype.safe_resources_amounts = {
    food: {min: 10, max: 25},
    fruits: {min: 3, max: 6},
    vegetables: {min: 3, max: 6},
    clothing: {min: 2, max: 3}
  };

  PersonDecider.prototype.findMostPayableJob = function (person) {
    var jobs = JobsList.getAvailablePayableJobs(person);
    if (jobs.length) {
      person.changeJob(jobs[0]);
      return true;
    } else {
      return false;
    }
  };

  PersonDecider.prototype.tryToSatisfyNeeds = function (person) {
    var needs = this._getNeededResources(person);

    if (governmentStorage.inhabitantsCanTakeResources()) {
      needs.forEach(function (needed_resource) {
        needed_resource.amount -= person.takeFromGovernmentStorage(needed_resource.res_name, needed_resource.amount);
      });
    }
    needs.forEach(function (needed_resource) {
      if (needed_resource.amount > 0) {
        needed_resource.amount -= person.buyOnLocalMarket(needed_resource.res_name, needed_resource.amount);
      }
    });

    if (person.job && person.job.current_progress < 1.0) {
      //return;
    }

    needs = needs.filter(function (res) { return res.amount > 0; });

    if (needs.length > 0) {
      this._changeJobToGetNeededResources(person, needs);
    }
  };

  PersonDecider.prototype._changeJobToGetNeededResources = function (person, needs) {
    var resources_obtainable_job = Resources.getBestResourceObtainableJobForPerson(person, needs);
    if (resources_obtainable_job) {
      if (resources_obtainable_job != person.job) {
        if (resources_obtainable_job.worker) {
          resources_obtainable_job.worker.changeJob(null);
        }
        person.changeJob(resources_obtainable_job);
      }
    }
  };

  PersonDecider.prototype._getNeededResources = function (person) {
    var needs = [],
      res_groups_map = Resources.getResourcesGroupsMapping();

    for (var res_name in this.safe_resources_amounts) {
      var total_res_amount = (res_groups_map[res_name] ? Object.keys(res_groups_map[res_name]).reduce(
        function (total_amount, res_name) {
          total_amount += person.resources[res_name];
          return total_amount;
      }, 0) : person.resources[res_name]);
      if (total_res_amount < this.safe_resources_amounts[res_name].min) {
        needs.push({
          res_name: res_name,
          amount: this.safe_resources_amounts[res_name].max - total_res_amount
        });
      }
    }
    return needs.sort(function (a, b) { return a.amount > b.amount ? -1 : 1; });
  };

  var decider = new PersonDecider(LocalMarket);

  return {
    tryToSatisfyNeeds: function (person) {
      return decider.tryToSatisfyNeeds(person);
    },
    findMostPayableJob: function (person) {
      return decider.findMostPayableJob(person);
    },
    _instance: decider
  };
}]);


