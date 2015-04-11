'use strict';

angular.module('towns').factory('populationProvider', ['Person', 'Math', 'PopulationConfig', 'environmentProvider',
    'ArrayUtils',
    function (Person, Math, PopulationConfig, environmentProvider, ArrayUtils) {
  var that = this;

  this.config = {
    immigration_rate: PopulationConfig.base_immigration_rate
  };

  this.people = [];

  this.processTick = function () {
    var people = ArrayUtils.shuffle(this.people);
    for (var i = people.length - 1; i >= 0; i--) {
      people[i].live();
    }
    this.immigrate();
  };

  this.immigrate = function () {
    if (Math.random() < this.config.immigration_rate) {
      this.people.push(new Person(null, null, environmentProvider.getPlayerTownBlock()));
    }
  };

  return {
    getCount: function () {
      return that.people.length;
    },
    getAll: function () {
      return that.people;
    },
    processTick: function () {
      that.processTick();
    },
    setupInitialPopulation: function (count) {
      for (var i = 0; i < count; i++) {
        that.people.push(new Person(null, null, environmentProvider.getPlayerTownBlock()));
      }
    },
    _instance: this
  };
}]);