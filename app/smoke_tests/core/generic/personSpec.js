/**
 * Created by benek on 2/19/15.
 */

describe('Person', function(){
  beforeEach(module('towns'));

  var Person, PopulationConfig, initProvider, populationProvider, buildingsProvider, GatherJob, environmentProvider,
    EnvironmentBlock;

  beforeEach(inject(function (_Person_, _PopulationConfig_, _initProvider_, _populationProvider_,
                              _buildingsProvider_, _GatherJob_, _environmentProvider_, _EnvironmentBlock_) {
    Person = _Person_;
    PopulationConfig = _PopulationConfig_;
    initProvider = _initProvider_;
    populationProvider = _populationProvider_;
    buildingsProvider = _buildingsProvider_;
    GatherJob = _GatherJob_;
    environmentProvider = _environmentProvider_;
    EnvironmentBlock = _EnvironmentBlock_;
  }));


  describe('global init', function () {
    it('add one Person if initial_population_count is 1', function () {

      initProvider.initGenericProviders();
      PopulationConfig.initial_population_count = 1;
      initProvider.setupInitialInstances();
      var person = populationProvider.getAll()[0];

      expect(person instanceof Person).toBeTruthy();
      expect(populationProvider.getCount()).toBe(1);

    });
  });

  describe('live', function () {

    var sum_resources_amounts = function (resources_amounts) {
      return Object.keys(resources_amounts).reduce(function (prev, curr) {
        return prev + resources_amounts[curr];
      }, 0)
    };

    describe('cause person finds job, he starts doing it and he benefits from it', function () {
      it('if there are no buildings he gathers resources from environment', function () {

        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 1;
        buildingsProvider.setupInitialBuildings = function () { };
        initProvider.setupInitialInstances();
        var person = populationProvider.getAll()[0],
          person_resources_amounts_sum = sum_resources_amounts(person.resources);
        EnvironmentBlock.prototype.gatherResources =
          jasmine.createSpy('gatherResources').andCallFake(EnvironmentBlock.prototype.gatherResources);
        GatherJob.prototype.base_progress_increase = 0.5;
        person.eat = function () {};

        person.live();

        expect(Object.keys(buildingsProvider.getAll()).length).toBe(0); // there shouldn't be any buildings
        expect(person.job instanceof GatherJob).toBeTruthy();
        expect(person.job.current_progress).toBeGreaterThan(0);

        person.live();

        expect(environmentProvider.getTownBlock().gatherResources).toHaveBeenCalledWith(person, jasmine.any(String));
        expect(sum_resources_amounts(person.resources)).toBeGreaterThan(person_resources_amounts_sum);

      });

      it('if there are no buildings he gathers resources from environment ' +
      'is valid also for more than one person', function () {

        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 4;
        buildingsProvider.setupInitialBuildings = function () { };
        initProvider.setupInitialInstances();
        var people = populationProvider.getAll(),
          people_resources_amounts_sums = people.reduce(function (obj, person) {
            obj[person.name] = sum_resources_amounts(person.resources);
            return obj;
          }, {});
        EnvironmentBlock.prototype.gatherResources =
          jasmine.createSpy('gatherResources').andCallFake(EnvironmentBlock.prototype.gatherResources);
        GatherJob.prototype.base_progress_increase = 0.5;

        Person.prototype.eat = function () {};

        people.forEach(function (person) {
          person.live();
        });

        expect(Object.keys(buildingsProvider.getAll()).length).toBe(0); // there shouldn't be any buildings

        people.forEach(function (person) {
          expect(person.job instanceof GatherJob).toBeTruthy();
          expect(person.job.current_progress).toBeGreaterThan(0);
        });

        people.forEach(function (person) {
          person.live();
        });

        people.forEach(function (person) {
          expect(environmentProvider.getTownBlock().gatherResources).toHaveBeenCalledWith(person, jasmine.any(String) );
          expect(sum_resources_amounts(person.resources)).toBeGreaterThan(people_resources_amounts_sums[person.name]);
        });

      });

    });

  });

});