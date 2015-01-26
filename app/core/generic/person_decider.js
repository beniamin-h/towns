/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('PersonDecider', ['LocalMarket', 'JobsList', function (LocalMarket, JobsList) {

  var PersonDecider = function (localMarket) {
    this.localMarket = localMarket;
  };

  PersonDecider.prototype.tryToImproveNeedsSatisfaction = function (person) {
    if (person.money > 0 && person.resources.food < 3) {
      this.tryToBuyFood();
    }

    /*
      food: 1.0,
      cloths: 1.0,
      shelter: 1.0,
      work: 1.0
    */
  };

  PersonDecider.prototype.tryToBuyFood = function (person) {
    var food_price = this.localMarket.getPrice('food'),
        amount_to_buy = 0,
        amount_affordable = person.money / food_price;
    if (amount_affordable < 1) {
      amount_to_buy = amount_affordable;
    } else if (person.needs.food < 0.5 || person.resources.food < 1) {
      amount_to_buy = amount_affordable > 5 ? 5 : amount_affordable;
    } else {
      amount_to_buy = amount_affordable > 3 ? 3 : amount_affordable;
    }
    this.localMarket.buy('food', amount_to_buy, person);
  };

  PersonDecider.prototype.makeGenericLiveDecision = function (person) {
    this.tryToImproveNeedsSatisfaction(person);
  };

  PersonDecider.prototype.decide = function (person) {
    this.tryToImproveNeedsSatisfaction(person);
  };

  PersonDecider.prototype.findJob = function (person) {
    var jobs = JobsList.getAvailableJobs(person);
    if (jobs.length) {
      person.changeJob(jobs[0]);
    }
  };

  var decider = new PersonDecider(LocalMarket);

  return {
    makeGenericLiveDecision: function (person) {
      decider.makeGenericLiveDecision(person);
    },
    findJob: function (person) {
      return decider.findJob(person);
    }
  };
}]);


