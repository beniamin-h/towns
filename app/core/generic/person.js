/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Person', ['PopulationConfig', 'PersonDecider', 'Math',
    function (PopulationConfig, PersonDecider, Math) {

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
  Person.prototype.needs = {
    food: 1.0,
    cloths: 1.0,
    shelter: 1.0,
    work: 1.0
  };
  Person.prototype.current_env_block = null;


  Person.prototype.born = function (mother, father) {
    this.sex = Math.random() > 0.5 ? 'male' : 'female';
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
  };

  Person.prototype.getRandomName = function (sex) {
    return names[sex][Math.floor(Math.random() * names[sex].length)]
  };

  Person.prototype.live = function () {
    this.wear();
    this.eat();
    this.tryToMakeDecision();
    this.work();
  };

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

  Person.prototype.work = function () {
    if (this.job) {
      this.job.do(this);
    }
  };

  Person.prototype.tryToMakeDecision = function () {
    if (!this.job) {
      PersonDecider.findJob(this);
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

  return Person;
}]);


