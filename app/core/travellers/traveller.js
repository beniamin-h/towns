/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Traveller', ['PeopleNames', 'Math', function (PeopleNames, Math) {

  var Traveller = function (type, offer) {
    this.offer = offer;
    this.name = PeopleNames.getRandomName(Math.random() > 0.3 ? 'male' : 'female');
  };

  Traveller.prototype.name = '';
  Traveller.prototype.offer = null;

  Traveller.prototype.makeDeal = function () {
    if (this.offer.isSale) {

    } else if (this.offer.isPurchase) {

    }
  };

  return Traveller;
}]);
