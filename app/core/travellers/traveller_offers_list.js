/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('TravellerOffersList', [function () {

  var TravellerOffersList = function () {
    this.offers = [];
  };

  TravellerOffersList.prototype.offers = [];

  TravellerOffersList.prototype.removeOffer = function () {
  };

  var travellerOffersList = new TravellerOffersList();

  return {
    getOffers: function () {
      return travellerOffersList.offers;
    },
    removeOffer: function () {

    }
  };
}]);
