/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Traveller', ['PeopleNames', 'Math', 'TravellerOffer', 'TravellerOffersList', 'Odds',
  function (PeopleNames, Math, TravellerOffer, TravellerOffersList, Odds) {

  var Traveller = function () {
    this.name = PeopleNames.getRandomName(Math.random() > 0.3 ? 'male' : 'female');
    this.type = Math.random() > 0.1 ? 'trader' : 'scientist';
    this.offers = [];
    this._generateOffers();
  };

  Traveller.prototype.name = '';
  Traveller.prototype.offers = null;
  Traveller.prototype.type = null;

  Traveller.prototype.makeDeal = function () {

  };

  Traveller.prototype._generateOffers = function () {
    for (var i = 0; i < (Odds.lower(10, 10) + 2) * 0.4; i++) {
      this.offers.push(new TravellerOffer(this));
    }
  };

  Traveller.prototype.arrive = function () {
    this.offers.map(function(offer) { TravellerOffersList.addOffer(offer); });
  };

  return Traveller;
}]);
