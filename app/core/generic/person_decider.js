/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('PersonDecider', ['LocalMarket', 'JobsList', 'Math',
    function (LocalMarket, JobsList, Math) {

  var PersonDecider = function (localMarket) {

  };

  PersonDecider.prototype.tryToImproveNeedsSatisfaction = function (person) {
    if (person.money > 0 && (person.resources.food || 0) < person.safe_food_amount_min) {
      this.tryToBuyFood(person);
    }

    /*
      food: 1.0,
      cloths: 1.0,
      shelter: 1.0,
      work: 1.0
    */
  };

  PersonDecider.prototype.tryToBuyFood = function (person) {
    var food_price = LocalMarket.getPriceToBuy('food'),
      amount_affordable = person.money / food_price,
      amount_to_buy = Math.min(amount_affordable, person.safe_food_amount_max - (person.resources.food || 0));
    if (amount_to_buy) {
      LocalMarket.buy('food', amount_to_buy, person);
    }
  };

  PersonDecider.prototype.makeGenericLiveDecision = function (person) {
    this.tryToImproveNeedsSatisfaction(person);
  };

  PersonDecider.prototype.fulfillTemporaryResourcesNeeds = function (person) {
    for(var needed_res_name in person.temporary_resources_needs) {
      if (person.resources[needed_res_name]) {
        if (person.resources[needed_res_name] > person.temporary_resources_needs[needed_res_name].amount) {
          this._deliverNeededResourcesToItsSources(person, needed_res_name,
            person.temporary_resources_needs[needed_res_name].amount);
          delete person.temporary_resources_needs[needed_res_name];
        } else {
          person.temporary_resources_needs[needed_res_name].amount -= person.resources[needed_res_name];
          var fulfilment_ratio = parseFloat(person.resources[needed_res_name]) /
            person.temporary_resources_needs[needed_res_name].amount;
          person.temporary_resources_needs[needed_res_name].priority *= 1 - fulfilment_ratio;
          this._deliverNeededResourcesToItsSources(person, needed_res_name,
            person.temporary_resources_needs[needed_res_name].amount);
        }
      } else {
        person.temporary_resources_needs[needed_res_name].priority += 1;
      }
    }
  };

  PersonDecider.prototype.tryToSellNeedlessResources = function (person) {
    for (var res_name in person.resources) {
      var amount_to_sell = person.resources[res_name];
      if (res_name == 'food') {
        amount_to_sell = Math.max(0, person.resources[res_name] - person.safe_food_amount_max);
      }
      if (amount_to_sell) {
        LocalMarket.sell(res_name, amount_to_sell, person);
      }
    }
  };

  PersonDecider.prototype._deliverNeededResourcesToItsSources = function (person, res_name, amount) {
    person.resources[res_name] -= amount;
  };

  PersonDecider.prototype.findJob = function (person) {
    var jobs = JobsList.getAvailableJobs(person);
    if (jobs.length) {
      person.changeJob(jobs[0]);
      return true;
    } else {
      return false;
    }
  };

  var decider = new PersonDecider(LocalMarket);

  return {
    makeGenericLiveDecision: function (person) {
      decider.makeGenericLiveDecision(person);
    },
    checkPersonalStorage: function (person) {
      decider.fulfillTemporaryResourcesNeeds(person);
      decider.tryToSellNeedlessResources(person);
    },
    findJob: function (person) {
      return decider.findJob(person);
    },
    _instance: decider
  };
}]);


