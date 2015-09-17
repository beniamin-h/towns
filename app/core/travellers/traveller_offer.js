/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('TravellerOffer', ['Math', 'Resources',
    function (Math, Resources) {

  var TravellerOffer = function (traveller) {
    this.traveller = traveller;
    this.turns_left = Math.floor(Math.random() * 30) + 10;
    this.is_sale = Math.random() > 0.5;
    this._generateOffer();
  };

  TravellerOffer.prototype.traveller = null;
  TravellerOffer.prototype.turns_left = 0;
  TravellerOffer.prototype.is_sale = false;
  TravellerOffer.prototype.subject = null;
  TravellerOffer.prototype.price = 0;

  TravellerOffer.prototype._generateOffer = function () {
    if (this.traveller.type == 'scientist') {
      this.subject = {
        type: 'technology',
        name: '',
        amount: 1
      };
      this.price = Math.floor(Math.random() * 10000);
    } else {
      var res_name = Object.keys(Resources.getResourcesInfo())[
        Math.floor(Math.random() * Resources.getResourcesInfo().length)];

      this.subject = {
        type: 'resource',
        name: res_name,
        amount: Math.floor(Math.random() * 100)
      };
      this.price = Math.floor(Math.random() * 100);
    }
  };

  return TravellerOffer;
}]);
