/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('TravellerOffer', ['Math', 'Resources', 'TravellerOffersList',
    function (Math, Resources, TravellerOffersList) {

  var TravellerOffer = function () {
    this.travellerSells = this.generateOffer();
    this.travellerBuys = this.generateOffer();
    this.turnsLeft = Math.floor(Math.random() * 30) + 10;
  };

  TravellerOffer.prototype.travellerSells = null;
  TravellerOffer.prototype.travellerBuys = null;
  TravellerOffer.prototype.turnsLeft = 0;

  TravellerOffer.prototype.generateOffer = function () {
    if (Math.random() > 0.5) {
      return {
        type: 'technology',
        subject: {
          tech: ''
        },
        price: Math.floor(Math.random() * 10000)
      };
    } else {
      var res_name = Object.keys(Resources.getResourcesInfo())[
        Math.floor(Math.random() * Resources.getResourcesInfo().length)];

      return {
        type: 'resource',
        subject: {
          res_name: res_name,
          res_amount: Math.floor(Math.random() * 100)
        },
        price: Math.floor(Math.random() * 100) / 10
      };
    }
  };

  TravellerOffer.prototype.processTick = function () {
    this.turnsLeft -= 1;
    if (this.turnsLeft < 0) {
      TravellerOffersList.removeOffer(this);
    }
  };

  return TravellerOffer;
}]);
