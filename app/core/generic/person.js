/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Person', [
  'PopulationConfig', 'PersonDecider', 'Math', 'LocalMarket', 'Resources', 'PeopleNames',
    function (PopulationConfig, PersonDecider, Math, LocalMarket, Resources, PeopleNames) {

  var _config = PopulationConfig;

  var Person = function (mother, father, env_block) {
    this.born(mother, father);
    this.current_env_block = env_block;
  };

  Person.prototype.is_human = true;
  Person.prototype.name = '';
  Person.prototype.sex = '';
  Person.prototype.age = 0;
  Person.prototype.money = 0;
  Person.prototype.job = null;
  Person.prototype.happiness = _config.base_initial_happiness;
  Person.prototype.health = _config.base_initial_health;
  Person.prototype.strength = 0;
  Person.prototype.resources = {};
  Person.prototype.buildings = [];
  Person.prototype.childOf = {
    mother: null,
    father: null
  };
  Person.prototype.temporary_resources_needs = {}; // { res_name: { priority: N, amount: N } }
  Person.prototype.needs = {
    food: 1.0,
    clothing: 1.0,
    shelter: 1.0,
    work: 1.0
  };
  Person.prototype.current_env_block = null;


  Person.prototype.born = function (mother, father) {
    this.sex = Math.random() > 0.5 ? 'male' : 'female';
    this.age = Math.round(Math.random() * 60);
    this.strength = Math.random() * 0.5 + 0.25;
    this.name = PeopleNames.getRandomName(this.sex);
    this.childOf = {
      mother: mother,
      father: father
    };
    this.needs = {};
    for (var need in Person.prototype.needs) {
      this.needs[need] = Person.prototype.needs[need];
    }
    this.initResources();
    this.buildings = [];
  };

  Person.prototype.initResources = function ( ) {
    this.resources = {};
    for (var res_name in Resources.getResourcesInfo()) {
      this.resources[res_name] = 0;
    }
  };

  Person.prototype.getRandomName = function (sex) {
    return PeopleNames[sex][Math.floor(Math.random() * PeopleNames[sex].length)]
  };

  Person.prototype.live = function () {
    this.consumeDailyResources();
    this.recalculatePersonalNeeds();
    this.sellNeedlessResourcesToLocalMarket();
    PersonDecider.tryToSatisfyNeeds(this);
    if (this.findMostPayableJob()) {
      this.work();
    }
  };

  Person.prototype.consumeDailyResources = function () {
    this.eat();
    this.wear();
    this.inhabit(); // ?; TODO
  };

  Person.prototype.recalculatePersonalNeeds = function () {
    this.recalculateHunger(); //food
    this.recalculateClothing(); //cloth
    this.recalculateInhabitancy(); //shelter TODO
    this.recalculateEmployment(); //work TODO
  };

  Person.prototype.recalculateHunger = function () {
    this.needs.food -= 0.05;
    this.needs.food = Math.max(0, this.needs.food);
  };

  Person.prototype.recalculateClothing = function () {
    this.needs.clothing -= 0.01;
    this.needs.clothing = Math.max(0, this.needs.clothing);
  };

  Person.prototype.recalculateInhabitancy = function () {

  };

  Person.prototype.recalculateEmployment = function () {

  };

  Person.prototype.eat = function () {
    var food_resources = Resources.getResourcesGroupsMapping()['food'],
      consumed_food = 0;
    for (var res_name in food_resources) {
      var consumed_resource;
      this.resources[res_name] = this.resources[res_name] || 0; // TODO: not here !!
      if (this.resources[res_name] == 0) {
        continue;
      } else {
        if (this.resources[res_name] > 1.0) {
          consumed_resource = 0.5;
        } else {
          consumed_resource = this.resources[res_name] * this.resources[res_name] / 2;
        }
      }

      consumed_food += consumed_resource * food_resources[res_name];

      this.resources[res_name] -= consumed_resource;
      if (consumed_food >= 2) {
        break;
      }
    }

    this.needs.food = (this.needs.food + consumed_food) / 2;
    this.needs.food = Math.min(1, this.needs.food);
  };

  Person.prototype.wear = function () {
    var consumed;
    this.resources['clothing'] = this.resources['clothing'] || 0;
    if (this.resources['clothing'] > 1) {
      consumed = 0.01;
    } else if (this.resources['clothing'] > 0.5) {
      consumed = this.resources['clothing'] * 0.01;
    } else if (this.resources['clothing'] > 0.005) {
      consumed = 0.005;
    } else {
      consumed = this.resources['clothing'];
    }

    this.resources['clothing'] -= consumed;
    this.needs.clothing += consumed * 10;
    this.needs.clothing = Math.min(1, this.needs.clothing);
  };

  Person.prototype.inhabit = function () {

  };

  Person.prototype.findMostPayableJob = function () {
    if (!this.job) {
      return PersonDecider.findMostPayableJob(this);
    } else {
      return true;
    }
  };

  Person.prototype.work = function () {
    if (this.job) {
      this.job.do(this);
      return true;
    }
    return false;
  };

  Person.prototype.changeJob = function (newJob) {
    if (this.job) {
      this.job.setWorker(null);
    }
    if (newJob) {
      newJob.setWorker(this);
    }
    this.job = newJob;
  };

  Person.prototype.sellNeedlessResourcesToLocalMarket = function () {

  };

  Person.prototype.takeFromGovernmentStorage = function (res_name, amount) {
    //return amount_taken;
    return 0;
  };

  Person.prototype.buyOnLocalMarket = function (res_name, amount) {
    //return amount_bought;
    return 0;
  };

  return Person;
}]);


