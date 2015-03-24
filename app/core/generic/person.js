/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Person', ['PopulationConfig', 'PersonDecider', 'Math', 'LocalMarket', 'Resources',
  'governmentStorage',
    function (PopulationConfig, PersonDecider, Math, LocalMarket, Resources, governmentStorage) {

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
    this.initResources();
    this.buildings = [];
    this.temporary_resources_needs = {};
    this.safe_resources_amounts = {
      food: {min: 5, max: 15},
      clothing: {min: 2, max: 3}
    };
  };

  Person.prototype.initResources = function ( ) {
    this.resources = {};
    for (var res_name in Resources.getResourcesInfo()) {
      this.resources[res_name] = 0;
    }
  };

  Person.prototype.getRandomName = function (sex) {
    return names[sex][Math.floor(Math.random() * names[sex].length)]
  };

  Person.prototype.live = function () {
    this.consumeDailyResources();
    this.recalculatePersonalNeeds();
    this.sellNeedlessResourcesToLocalMarket();
    this.tryToSatisfyNeeds();
    if (this.findJob()) {
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
    var consumed;
    this.resources['food'] = this.resources['food'] || 0; // TODO: not food !!
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

  Person.prototype.findJob = function () {
    if (!this.job) {
      return PersonDecider.findJob(this);
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

  Person.prototype.tryToSatisfyNeeds = function () {
    var needs = this.getNeededResources(),
      that = this;

    if (governmentStorage.inhabitantsCanTakeResources()) {
      needs.forEach(function (needed_resource) {
        needed_resource.amount -= that.takeFromGovernmentStorage(needed_resource.res_name, needed_resource.amount);
      });
    }
    needs.forEach(function (needed_resource) {
      if (needed_resource.amount > 0) {
        needed_resource.amount -= that.buyOnLocalMarket(needed_resource.res_name, needed_resource.amount);
      }
    });

    needs = needs.filter(function (res) { return res.amount > 0; });

    if (needs.length > 0) {
      var resources_obtainable_job = Resources.getBestResourceObtainableJobForPerson(this, needs);
      if (resources_obtainable_job) {
        if (resources_obtainable_job.worker) {
          resources_obtainable_job.worker.job = null;
        }
        this.changeJob(resources_obtainable_job);
      }
    }
  };

  Person.prototype.getNeededResources = function () {
    var needs = [];
    for (var res_name in this.safe_resources_amounts) {
      if (this.resources[res_name] < this.safe_resources_amounts[res_name].min) {
        needs.push({
          res_name: res_name,
          amount: this.safe_resources_amounts[res_name].max - this.resources[res_name]
        });
      }
    }
    return needs.sort(function (a, b) { return a.amount > b.amount ? -1 : 1; });
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


