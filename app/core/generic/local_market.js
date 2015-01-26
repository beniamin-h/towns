/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('LocalMarket', function () {

  var LocalMarket = function () {

  };

  LocalMarket.prototype.buy = function (resource_name, amount_to_buy, person) {

  };

  LocalMarket.prototype.getPrice = function (resource_name) {

  };

  var local_market = new LocalMarket();

  return {
    buy: function (resource_name, amount_to_buy, person) {
      return local_market.buy(resource_name, amount_to_buy, person);
    },
    getPrice: function (resource_name) {
      return local_market.getPrice(resource_name);
    }
  };
});


