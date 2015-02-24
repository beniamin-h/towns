/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('LocalMarket', function () {

  var LocalMarket = function () {
    this.purchasable_resouces = {};
  };

  // buy from market
  LocalMarket.prototype.buy = function (resource_name, amount_to_buy, person) {
    person.resources[resource_name] = person.resources[resource_name] || 0;
    person.resources[resource_name] += amount_to_buy;
    person.money -= amount_to_buy * this.getPriceToBuy(resource_name);
  };

  // sell to market
  LocalMarket.prototype.sell = function (resource_name, amount_to_sell, person) {
    person.resources[resource_name] -= amount_to_sell;
    person.money += amount_to_sell * this.getPriceToSell(resource_name);
  };

  // price to buy from market
  LocalMarket.prototype.getPriceToBuy = function (resource_name) {
    return 0.5;
  };

  // price to sell to market
  LocalMarket.prototype.getPriceToSell = function (resource_name) {
    return 2;
  };

  LocalMarket.prototype.getSellersOf = function (resource_name) {
    return [];
  };

  LocalMarket.prototype.getBuyersOf = function (resource_name) {
    return [];
  };

  var local_market = new LocalMarket();

  return {
    buy: function (resource_name, amount_to_buy, person) {
      return local_market.buy(resource_name, amount_to_buy, person);
    },
    sell: function (resource_name, amount_to_buy, person) {
      return local_market.sell(resource_name, amount_to_buy, person);
    },
    getPriceToBuy: function (resource_name) {
      return local_market.getPriceToBuy(resource_name);
    },
    getPriceToSell: function (resource_name) {
      return local_market.getPriceToSell(resource_name);
    },
    thereAreAnySellersOf: function (resource_name) {
      return !! local_market.getSellersOf(resource_name).length;
    },
    thereAreAnyBuyersOf: function (resource_name) {
      return !! local_market.getBuyersOf(resource_name).length;
    },
    getPurchasableResourceAmount: function (resource_name) {
      return local_market.purchasable_resouces[resource_name] || 0;
    }
  };
});


