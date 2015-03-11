/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Person', ['PopulationConfig', 'PersonDecider', 'Math', 'LocalMarket',
    function (PopulationConfig, PersonDecider, Math, LocalMarket) {

  var names = {
    'male':[
      'Ulrich',
      'Adam',
      'Aksel',
      'Albert',
      'Albin',
      'Alf',
      'Alfred',
      'Alvar',
      'Anders',
      'Anton',
      'Ari',
      'Aron',
      'Arthur',
      'August',
      'Bent',
      'Bernt',
      'Bosse',
      'Carl',
      'Casper',
      'Cristen',
      'Claus',
      'Daniel',
      'David',
      'Edvin',
      'Einer',
      'Elis',
      'Elof',
      'Emil',
      'Eric',
      'Erling',
      'Espen',
      'Fannar',
      'Filip',
      'Flemming',
      'Frans',
      'Frederik',
      'Frej',
      'Frode',
      'Gabriel',
      'Georg',
      'Gerd',
      'Gerhard',
      'Gotdfred'
    ],
    'female': [
      'Agathe',
      'Agnes',
      'Alexandra',
      'Alva',
      'Amanda',
      'Ane',
      'Anja',
      'Annika',
      'Astrid',
      'Beata',
      'Beatrice',
      'Birgit',
      'Bjorg',
      'Brita',
      'Camilla',
      'Carina',
      'Carola',
      'Cathrine',
      'Cecilia',
      'Charlotte',
      'Cristine',
      'Dorote',
      'Ebba',
      'Edit',
      'Eira',
      'Elin',
      'Elisabeth',
      'Ella',
      'Elsa',
      'Emma',
      'Erika',
      'Ester',
      'Eva',
      'Felicia',
      'Frida',
      'Froya',
      'Gina'
    ]
  };

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
  Person.prototype.strength = Math.random();
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
    rest: 1.0,
    shelter: 1.0,
    work: 1.0
  };
  Person.prototype.current_env_block = null;


  Person.prototype.born = function (mother, father) {
    this.sex = Math.random() > 0.5 ? 'male' : 'female';
    this.age = Math.round(Math.random() * 60);
    this.name = [this.getRandomName(this.sex), this.getRandomName(this.sex)].join(' ');
    this.childOf = {
      mother: mother,
      father: father
    };
    this.needs = {};
    for (var need in Person.prototype.needs) {
      this.needs[need] = Person.prototype.needs[need];
    }
    this.resources = {};
    this.buildings = [];
    this.temporary_resources_needs = {};
    this.safe_food_amount_min = _config.base_daily_food_consumption * 30;
    this.safe_food_amount_max = _config.base_daily_food_consumption * 60;
  };

  Person.prototype.getRandomName = function (sex) {
    return names[sex][Math.floor(Math.random() * names[sex].length)]
  };

  Person.prototype.live = function () {
    this.consumeDailyResources();
    this.recalculatePersonalNeeds();
    this.tryToSatisfyNeeds();
  };

  Person.prototype.consumeDailyResources = function () {
    this.wear();
    this.inhabit(); // ?
  };

  Person.prototype.recalculatePersonalNeeds = function () {
    this.recalculateHunger(); //food
    this.recalculateClothing(); //cloth
    this.recalculateRest(); //shelter
    this.recalculateInhabitancy(); //shelter
    this.recalculateEmployment(); //work
  };

  Person.prototype.recalculateHunger = function () {
    this.needs.food -= 0.05;
    this.needs.food = this.needs.food < 0 ? 0 : this.needs.food;
  };

  Person.prototype.recalculateClothing = function () {
    this.needs.clothing -= 0.01;
    this.needs.clothing = this.needs.clothing < 0 ? 0 : this.needs.clothing;
  };

  Person.prototype.recalculateRest = function () {
    this.needs.rest -= 0.1;
    this.needs.rest = this.needs.rest < 0 ? 0 : this.needs.rest;
  };

  Person.prototype.recalculateInhabitancy = function () {

  };

  Person.prototype.recalculateEmployment = function () {

  };

  Person.prototype.tryToSatisfyNeeds = function () {
    var need_to_satisfy = this.chooseMostWorrisomeNeed();
    if (need_to_satisfy.type == 'personal need') {
      if (need_to_satisfy.subject == 'food') {
        this.eat();
      } else if (need_to_satisfy.subject == 'rest') {
        this.rest();
      }
    } else if (need_to_satisfy.type == 'products') {
      this.buyOnLocalMarket(need_to_satisfy.subject) ||
        this.gatherResourceFromEnv(need_to_satisfy.subject) ||
        this.tryToProduce(need_to_satisfy.subject) ||
        this.stealResource(need_to_satisfy.subject);
    } else if (need_to_satisfy.type == 'money') {
      this.goToWork() ||
        this.findJob() ||
        this.sellNeedlessResourcesToLocalMarket() ||
        this.stealResource();
    }
  };

  Person.prototype.chooseMostWorrisomeNeed = function () {
    var type = 'personal need' || 'products' || 'money';
    var subject = 'food' || 'rest' || 'clothing' || 'money' || 'etc.';
    return {
      type: type,
      subject: subject
    }
  };

  Person.prototype.wear = function () {
    var consumed;
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
    this.needs.clothing = this.needs.clothing < 1 ? this.needs.clothing : 1;
  };

  Person.prototype.eat = function () {
    var consumed;
    if (this.resources['food'] > 1) {
      consumed = 0.1;
    } else if (this.resources['food'] > 0.5) {
      consumed = this.resources['food'] * 0.1;
    } else if (this.resources['food'] > 0.05) {
      consumed = 0.05;
    } else {
      consumed = this.resources['food'];
    }

    this.resources['food'] -= consumed;
    this.needs.food += consumed;
    this.needs.food = this.needs.food < 1 ? this.needs.food : 1;
  };

  Person.prototype.rest = function () {
    this.needs.rest += 0.5;
    this.needs.rest = this.needs.rest > 1 ? 1 : this.needs.rest;
  };

  Person.prototype.inhabit = function () {

  };

  Person.prototype.buyOnLocalMarket = function () {

  };

  Person.prototype.gatherResourceFromEnv = function () {

  };

  Person.prototype.tryToProduce = function () {

  };

  Person.prototype.findJob = function () {
    if (!this.job) {
      PersonDecider.findJob(this);
    }
  };

  Person.prototype.goToWork = function () {

  };

  Person.prototype.sellNeedlessResourcesToLocalMarket = function () {

  };

  Person.prototype.stealResource = function () {

  };


  Person.prototype.work = function () {
    if (this.job) {
      this.job.do(this);
    }
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

  Person.prototype.isInterestedInJob = function (job) {
    return true;
  };


  /*
  Person.prototype.eat = function () {
    if (this.resources.food > _config.base_daily_food_consumption) {
      this.needs.food += _config.base_daily_food_regeneration;
      this.resources.food -= _config.base_daily_food_consumption;
    } else if (this.resources.food > 0) {
      this.needs.food += _config.base_daily_food_regeneration * this.resources.food;
      this.resources.food = 0;
    } else {
      this.needs.food -= this.needs.food > _config.base_daily_food_need ?
        _config.base_daily_food_need : this.needs.food;
    }
    this.needs.food = Math.max(0, this.needs.food);
    this.needs.food = Math.min(1, this.needs.food);
  };

  Person.prototype.wear = function () {
    if (this.resources.cloths > 0) {
      this.needs.cloths += _config.base_daily_cloths_regeneration ?
        this.resources.cloths > _config.base_daily_cloths_consumption :
          this.resources.cloths * (_config.base_daily_cloths_regeneration / _config.base_daily_cloths_consumption);
      this.resources.cloths -= _config.base_daily_cloths_consumption ?
        this.resources.cloths > _config.base_daily_cloths_consumption : this.resources.cloths;
    } else {
      this.needs.cloths -= this.needs.cloths > _config.base_daily_cloths_need ?
        _config.base_daily_cloths_need : this.needs.cloths;
    }
  };

  Person.prototype.getMostFulfillAbleTemporaryNeededResource = function (res_amounts) {
    var most_needed = null,
      most_needed_fulfillment = 0,
      available_resources = Object.keys(res_amounts);
    for (var res_name in this.temporary_resources_needs) {
      if (available_resources.indexOf(res_name) != -1 &&
          this.temporary_resources_needs[res_name].priority > most_needed_fulfillment) {
        most_needed_fulfillment = this.temporary_resources_needs[res_name].priority *
          Math.min(1.0, res_amounts[res_name] / this.temporary_resources_needs[res_name].amount);
        most_needed = res_name;
      }
    }
    return most_needed;
  };
  */

  /*
  Person.prototype.getSortedByPriorityAndGivenResAmountTemporaryNeededResourcesNames = function (res_amounts) {
    var that = this;
    return Object.keys(this.temporary_resources_needs).sort(function (res_name_a, res_name_b) {
      var priority_a = that.temporary_resources_needs[res_name_a].priority * (res_amounts[res_name_a] || 0),
        priority_b = that.temporary_resources_needs[res_name_b].priority * (res_amounts[res_name_b] || 0);
      if (priority_a > priority_b) {
        return -1;
      } else if (priority_a < priority_b) {
        return 1;
      } else {
        return 0;
      }
    });
  };
  */

  return Person;
}]);


