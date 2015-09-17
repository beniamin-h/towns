/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('TravellerOffersList', [function () {

  var TravellerOffersList = function () {
    this.offers = [];
  };

  TravellerOffersList.prototype.offers = null;

  TravellerOffersList.prototype.addOffer = function (offer) {
    this.offers.push(offer);
  };

  TravellerOffersList.prototype.removeOffer = function (offer) {
    var index = this.offers.indexOf(offer);
    this.offers.splice(offer, 1);
  };

  TravellerOffersList.prototype.processTick = function () {
    for (var i = this.offers.length - 1; i >= 0; i--) {
      this.offers[i].turns_left -= 1;
      if (this.offers[i].turns_left < 0) {
        this.removeOffer(this.offers[i]);
      }
    }
  };

  var travellerOffersList = new TravellerOffersList();

  return {
    getOffers: function () {
      return travellerOffersList.offers;
    },
    addOffer: function (offer) {
      return travellerOffersList.addOffer(offer);
    },
    removeOffer: function (offer) {
      return travellerOffersList.removeOffer(offer);
    },
    processTick: function () {
      return travellerOffersList.processTick();

    }
  };
}]);
