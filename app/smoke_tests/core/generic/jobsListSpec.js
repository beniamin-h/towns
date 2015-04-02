/**
 * Created by benek on 2/19/15.
 */

describe('JobsList', function(){
  beforeEach(module('towns'));

  var Person, PersonDecider, PopulationConfig, initProvider, populationProvider, buildingsProvider,
    GatherFruitsJob, GatherVegetablesJob, environmentProvider, EnvironmentBlock, Resources, JobsList;

  beforeEach(inject(function (_Person_, _PersonDecider_, _PopulationConfig_, _initProvider_, _populationProvider_,
                              _buildingsProvider_, _GatherFruitsJob_, _GatherVegetablesJob_,
                              _environmentProvider_, _EnvironmentBlock_, _Resources_, _JobsList_) {
    Person = _Person_;
    PersonDecider = _PersonDecider_;
    PopulationConfig = _PopulationConfig_;
    initProvider = _initProvider_;
    populationProvider = _populationProvider_;
    buildingsProvider = _buildingsProvider_;
    GatherFruitsJob = _GatherFruitsJob_;
    GatherVegetablesJob = _GatherVegetablesJob_;
    environmentProvider = _environmentProvider_;
    EnvironmentBlock = _EnvironmentBlock_;
    JobsList = _JobsList_;
    Resources = _Resources_;
    Resources.setupInstance(JobsList);
  }));


  describe('global init', function () {

    var clear_resources_amounts = function (person) {
      person.resources = Object.keys(person.resources).reduce(function (resources, res_name) {
        resources[res_name] = 0;
        return resources;
      }, {});
    };

    describe(' - if there are only two auto created gathering jobs', function () {

      it('and there is only one person without any resources \n' +
      ' - processTicks causes adding one job to JobsList', function () {
        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 1;
        initProvider.setupInitialInstances();
        var person = populationProvider.getAll()[0],
          jobs_list = JobsList.getInstance();
        jobs_list.jobs = [];
        JobsList.addJob(new GatherFruitsJob(environmentProvider.getPlayerTownBlock(), null));
        JobsList.addJob(new GatherVegetablesJob(environmentProvider.getPlayerTownBlock(), null));
        expect(JobsList.getAllJobs().length).toBe(2);

        for (var i = 0; i < 100; i++) {
          clear_resources_amounts(person);
          initProvider.processTicks();
          expect(JobsList.getAllJobs().length).toBe(3);
        }
      });

      it('and there are two people without any resources \n' +
      ' - processTicks causes adding two the same type jobs to JobsList', function () {
        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 2;
        initProvider.setupInitialInstances();
        var people = populationProvider.getAll(),
          jobs_list = JobsList.getInstance();
        jobs_list.jobs = [];
        JobsList.addJob(new GatherFruitsJob(environmentProvider.getPlayerTownBlock(), null));
        JobsList.addJob(new GatherVegetablesJob(environmentProvider.getPlayerTownBlock(), null));
        expect(JobsList.getAllJobs().length).toBe(2);

        for (var i = 0; i < 100; i++) {
          clear_resources_amounts(people[0]);
          clear_resources_amounts(people[1]);
          initProvider.processTicks();
          expect(JobsList.getAllJobs().length).toBe(4);
          for (var j = 0; j < 4; j++) {
            expect(JobsList.getAllJobs()[j] instanceof GatherFruitsJob ||
              JobsList.getAllJobs()[j] instanceof GatherVegetablesJob).toBeTruthy();
          }
        }
      });

      it('and there are two people without any resources \n' +
      ' - processTicks causes change jobs progress to 1.0', function () {
        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 2;
        initProvider.setupInitialInstances();
        var people = populationProvider.getAll(),
          jobs_list = JobsList.getInstance();
        jobs_list.jobs = [];
        JobsList.addJob(new GatherFruitsJob(environmentProvider.getPlayerTownBlock(), null));
        JobsList.addJob(new GatherVegetablesJob(environmentProvider.getPlayerTownBlock(), null));
        expect(JobsList.getAllJobs().length).toBe(2);

        for (var i = 0; i < 100; i++) {
          clear_resources_amounts(people[0]);
          clear_resources_amounts(people[1]);
          initProvider.processTicks();
          expect(people[0].job.current_progress).toBe(1.0);
          expect(people[1].job.current_progress).toBe(1.0);
          for (var j = 0, jobs = JobsList.getAllJobs(); j < 4; j++) {
            if (jobs[j].worker) {
              expect(jobs[j].current_progress).toBe(1.0);
            }
          }
        }
      });

      it('and there are two people with some resources \n' +
      ' - processTicks causes change jobs progress to 1.0', function () {
        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 2;
        initProvider.setupInitialInstances();
        var people = populationProvider.getAll(),
          jobs_list = JobsList.getInstance();
        jobs_list.jobs = [];
        JobsList.addJob(new GatherFruitsJob(environmentProvider.getPlayerTownBlock(), null));
        JobsList.addJob(new GatherVegetablesJob(environmentProvider.getPlayerTownBlock(), null));
        expect(JobsList.getAllJobs().length).toBe(2);

        for (var i = 0; i < 100; i++) {
          initProvider.processTicks();
          if (people[0].job) {
            expect(people[0].job.current_progress).toBe(1.0);
          }
          if (people[1].job) {
            expect(people[1].job.current_progress).toBe(1.0);
          }
          for (var j = 0, jobs = JobsList.getAllJobs(); j < jobs.length; j++) {
            if (jobs[j].worker) {
              expect(jobs[j].current_progress).toBe(1.0);
            }
          }
        }
      });

      it('and there are twenty people without any resources \n' +
      ' - processTicks causes change jobs progress to 1.0', function () {
        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 20;
        initProvider.setupInitialInstances();
        var people = populationProvider.getAll(),
          jobs_list = JobsList.getInstance();
        jobs_list.jobs = [];
        spyOn(JobsList, 'addJob').andCallThrough();
        JobsList.addJob(new GatherFruitsJob(environmentProvider.getPlayerTownBlock(), null));
        JobsList.addJob(new GatherVegetablesJob(environmentProvider.getPlayerTownBlock(), null));
        expect(JobsList.getAllJobs().length).toBe(2);

        for (var i = 0; i < 50; i++) {
          for (var p = 0; p < 20; p++) {
            clear_resources_amounts(people[p]);
          }
          JobsList.clearDoneJobs();

          for (var j = 0, jobs = JobsList.getAllJobs(), progresses = 0; j < jobs.length; j++) {
            progresses += jobs[j].current_progress;
          }
          expect(progresses).toBe(0);

          for (p = 0; p < 20; p++) {
            people[p].consumeDailyResources();
            people[p].recalculatePersonalNeeds();
            people[p].sellNeedlessResourcesToLocalMarket();
            PersonDecider.tryToSatisfyNeeds(people[p]);
            expect(people[p].job.current_progress).toBe(0.0);
            expect(JobsList.getAllJobs().indexOf(people[p].job)).toBeGreaterThan(-1);
            people[p].work();
            expect(people[p].job.current_progress).toBe(1.0);
          }
          buildingsProvider.processTick();
          Resources.regenerateResourcesObtainableJobs();

          for (p = 0; p < 20; p++) {
            expect(people[p].job.current_progress).toBe(1.0);
          }
          for (j = 0, jobs = JobsList.getAllJobs(), progresses = 0; j < 22; j++) {
            progresses += jobs[j].current_progress;
          }
          expect(progresses).toBe(20);
        }
      });

    });

  });

  describe('live', function () {

    /*
    var sum_resources_amounts = function (resources_amounts) {
      return Object.keys(resources_amounts).reduce(function (prev, curr) {
        return prev + resources_amounts[curr];
      }, 0)
    };

    describe('cause person finds job, he starts doing it and he gains some food', function () {
      it('if there are no buildings he gathers resources from environment', function () {

        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 1;
        buildingsProvider.setupInitialBuildings = function () { };
        initProvider.setupInitialInstances();
        var person = populationProvider.getAll()[0],
          base_env_resources_amounts_sum = sum_resources_amounts(environmentProvider.getTownBlock().resources);
        EnvironmentBlock.prototype.gatherResources =
          jasmine.createSpy('gatherResources').andCallFake(EnvironmentBlock.prototype.gatherResources);
        GatherFruitsJob.prototype.base_progress_increase = 0.5;
        person.resources['food'] = 0;

        person.live();

        expect(Object.keys(buildingsProvider.getAll()).length).toBe(0); // there shouldn't be any buildings
        expect(person.job instanceof GatherFruitsJob).toBeTruthy();
        expect(person.job.current_progress).toBeGreaterThan(0);

        person.live();

        expect(environmentProvider.getTownBlock().gatherResources).toHaveBeenCalledWith(person, jasmine.any(String));
        expect(person.resources['food']).toBeGreaterThan(0);
        expect(sum_resources_amounts(environmentProvider.getTownBlock().resources)).toBeLessThan(
          base_env_resources_amounts_sum);

      });

      it('if there are no buildings he gathers resources from environment ' +
      'is valid also for more than one person', function () {

        initProvider.initGenericProviders();
        PopulationConfig.initial_population_count = 4;
        buildingsProvider.setupInitialBuildings = function () { };
        initProvider.setupInitialInstances();
        var people = populationProvider.getAll(),
          base_env_resources_amounts_sum = sum_resources_amounts(environmentProvider.getTownBlock().resources),
          people_resources_amounts_sums = people.reduce(function (obj, person) {
            obj[person.name] = sum_resources_amounts(person.resources);
            return obj;
          }, {});
        EnvironmentBlock.prototype.gatherResources =
          jasmine.createSpy('gatherResources').andCallFake(EnvironmentBlock.prototype.gatherResources);
        GatherFruitsJob.prototype.base_progress_increase = 0.5;

        Person.prototype.eat = function () {};

        people.forEach(function (person) {
          person.live();
        });

        expect(Object.keys(buildingsProvider.getAll()).length).toBe(0); // there shouldn't be any buildings

        people.forEach(function (person) {
          expect(person.job instanceof GatherFruitsJob).toBeTruthy();
          expect(person.job.current_progress).toBeGreaterThan(0);
        });

        people.forEach(function (person) {
          person.live();
        });

        people.forEach(function (person) {
          expect(environmentProvider.getTownBlock().gatherResources).toHaveBeenCalledWith(person, jasmine.any(String) );
          expect(sum_resources_amounts(person.resources)).toBeGreaterThan(people_resources_amounts_sums[person.name]);
        });
        expect(sum_resources_amounts(environmentProvider.getTownBlock().resources)).toBeLessThan(
          base_env_resources_amounts_sum);

        people.forEach(function (person) {
          person.live();
          expect(person.job.current_progress).toBeGreaterThan(0);
          person.live();
          expect(person.job).toBe(null);
        });

      });

    });
      */

  });

});