/**
 * Created by benek on 12/25/14.
 */


angular.module('towns').factory('GatherJob', ['Job', 'Resources', 'LocalMarket', 'Math',
  function (Job, Resources, LocalMarket, Math) {

  var GatherJob = function () {
    Job.apply(this, arguments);
    this.current_gathering_resource = null;
  };

  GatherJob.prototype = Object.create(Job.prototype);
  GatherJob.prototype.constructor = GatherJob;

  GatherJob.prototype.name = 'Gather resources';
  GatherJob.prototype.base_progress_increase = 0.3334;

  GatherJob.prototype.can_do = function (person) {
    var parent_result = Job.prototype.can_do.apply(this, arguments);
    return parent_result;
  };

  GatherJob.prototype['do'] = function (person) {
    Job.prototype.do.apply(this, arguments);

    if (this.current_progress == 0) {
      this.current_gathering_resource = this._getMostProfitableOrNeededResource(person);
    }

    this.readable_name = 'Gather ' + this.current_gathering_resource.res_name;

    this.current_progress += this.base_progress_increase;

    if (this.current_progress >= 1.0) {
      var gathered_resources = person.current_env_block.gatherResources(
        person, this.current_gathering_resource.res_name);
      for (var res_name in gathered_resources) {
        person.resources[res_name] = person.resources[res_name] || 0;
        person.resources[res_name] += gathered_resources[res_name];
      }
      this.finishJob();
      this.readable_name = this.name;
    }
  };

  GatherJob.prototype._thereAreAnySellers = function () {
    return false;
  };

  GatherJob.prototype._getMostProfitableOrNeededResource = function (person) {
    var gathered_resources = person.current_env_block.getMaxResourcesAmountsFromGathering(person),
      gathered_amounts = gathered_resources.gathered_amounts,
      gathered_from = gathered_resources.gathered_from,
      max_eatable_resource_amount_from_gathering = 0,
      best_eatable_resource_gathering_source = null,
      earned_money_per_resource = {},
      max_money_amount_from_selling = 0,
      best_resource_for_selling_source = null,
      person_should_gather = null,
      person_should_sell_resources;

    for (var eatable_res_name in Resources.getEatableResourcesNames()) {
      if (gathered_amounts[eatable_res_name] > max_eatable_resource_amount_from_gathering) {
        max_eatable_resource_amount_from_gathering = gathered_amounts[eatable_res_name];
        best_eatable_resource_gathering_source = gathered_from[eatable_res_name];
      }
    }

    for (var res_name in gathered_amounts) {
      earned_money_per_resource[res_name] = LocalMarket.getPrice(res_name) * gathered_amounts[res_name];
      if (earned_money_per_resource[res_name] > max_money_amount_from_selling) {
        max_money_amount_from_selling = earned_money_per_resource[res_name];
        best_resource_for_selling_source = gathered_from[res_name];
      }
    }

    var max_affordable_food_amount = max_money_amount_from_selling / LocalMarket.getPrice('food'),
      max_purchasable_food_amount = LocalMarket.getPurchasableResourceAmount('food'),
      max_food_amount_to_buy_for_money_from_gathering =
      Math.min(max_affordable_food_amount, max_purchasable_food_amount);

    if (person.resources.food < 3) {
      if (max_eatable_resource_amount_from_gathering > max_food_amount_to_buy_for_money_from_gathering) {
        person_should_gather = best_eatable_resource_gathering_source;
        person_should_sell_resources = false;
      } else {
        person_should_gather = best_resource_for_selling_source;
        person_should_sell_resources = true;
      }
    } else {
      if (Object.keys(person.temporary_resources_needs).length) {
        person_should_gather = person.getMostFulfillAbleTemporaryNeededResource(gathered_amounts);
        person_should_sell_resources = false;
      } else {
        person_should_gather = best_resource_for_selling_source;
        person_should_sell_resources = true;
      }
    }

    return {
      res_name: person_should_gather,
      for_selling: person_should_sell_resources
    };
  };

  return GatherJob;
}]);
