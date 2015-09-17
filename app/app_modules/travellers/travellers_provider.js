'use strict';

angular.module('towns').factory('travellersProvider', ['TravellerOffersList',
    function (TravellerOffersList) {
  var that = this;

  return {
    getOffers: function () {
      return TravellerOffersList.getOffers();
    },
    _instance: this
  };
}]);