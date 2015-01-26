/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Government', ['Person', function (Person) {

  var Government = function () {
    this.resources = {};
    this.buildings = [];
  };

  Government.prototype = Object.create(Person.prototype);
  Government.prototype.constructor = Government;

  Government.prototype.is_human = false;
  Government.prototype.name = 'Government';
  Government.prototype.money = 100;
  Government.prototype.resources = {};
  Government.prototype.buildings = [];

  Government.prototype.live = function () {};

  Person.prototype.isInterestedInJob = function (job) {
    return false;
  };

  var government = new Government();

  return {
    getInstance: function () {
      return government;
    }
  };
}]);


