/**
 * Created by benek on 12/25/14.
 */

describe('populationProvider', function(){
  beforeEach(module('towns'));

  var populationProvider, Person, Math;

  beforeEach(inject(function(_populationProvider_, _Person_, _Math_){
    populationProvider = _populationProvider_;
    Person = _Person_;
    Math = _Math_;
  }));

  describe('setupInitialPopulation', function(){
    it('extends population count by a given number', function(){
      populationProvider.setupInitialPopulation(15);

      expect(populationProvider.getCount()).toBe(15);
    });

    it('create Person instances of a given number', function(){
      populationProvider.setupInitialPopulation(4);
      var people = populationProvider.getAll();

      people.forEach(function(person){
        expect(person instanceof Person).toBeTruthy();
      });
    });

  });

  describe('processTick', function(){
    it('causes immigration', function(){
      populationProvider._instance.immigrate = jasmine.createSpy('immigrateFunc');
      populationProvider.setupInitialPopulation(15);
      populationProvider.processTick();

      expect(populationProvider._instance.immigrate).toHaveBeenCalled();
    });

    it('cause population increase if immigration rate is 1.0', function(){
      populationProvider._instance.config.immigration_rate = 1.0;
      populationProvider.setupInitialPopulation(15);

      var _random = Math.random;
      Math.random = function () { return 0.0001 };
      populationProvider.processTick();
      populationProvider.processTick();
      Math.random = _random;

      expect(populationProvider.getCount()).toBe(17);
    });
  });

});