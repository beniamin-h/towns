'use strict';

angular.module('towns').factory('populationProvider', ['Person', 'Math', 'PopulationConfig',
    function (Person, Math, PopulationConfig) {
  var that = this;

  this.config = {
    immigration_rate: PopulationConfig.base_immigration_rate
  };

  this.people = [];
  this.selected_person = null;

  this.processTick = function () {
    for (var i = this.people.length - 1; i >= 0; i--) {
      this.people[i].live()
    }
    this.immigrate();
  };

  this.immigrate = function () {
    if (Math.random() < this.config.immigration_rate) {
      this.people.push(new Person(null, null));
    }
  };

  return {
    getCount: function () {
      return that.people.length;
    },
    getAll: function () {
      return that.people;
    },
    selectPerson: function (person) {
      that.selected_person = person;
    },
    getSelectedPerson: function () {
      return that.selected_person;
    },
    processTick: function () {
      that.processTick();
    },
    setupInitialPopulation: function (count) {
      for (var i = 0; i < count; i++) {
        that.people.push(new Person(null, null));
      }
    },
    _factory: this
  };
}]);