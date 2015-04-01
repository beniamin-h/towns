/**
 * Created by benek on 12/25/14.
 */

describe('buildingsProvider', function(){
  beforeEach(module('towns'));

  var buildingsProvider, ImmigrantsCampBuilding, Building, mapProvider, Resources, JobsList;

  beforeEach(inject(function(_buildingsProvider_, _ImmigrantsCampBuilding_, _Building_, _mapProvider_,
                             _Resources_, _JobsList_) {
    buildingsProvider = _buildingsProvider_;
    buildingsProvider.initBuildingsProvider();
    ImmigrantsCampBuilding = _ImmigrantsCampBuilding_;
    Building = _Building_;
    mapProvider = _mapProvider_;
    mapProvider.initMap();
    JobsList = _JobsList_;
    Resources = _Resources_;
    Resources.setupInstance(JobsList);
  }));

  describe('build', function(){
    it('creates instance of Building with proper index', function(){
      buildingsProvider.build('ImmigrantsCamp', 12, jasmine.createSpy());

      expect(buildingsProvider.getAt(12) instanceof Building).toBeTruthy();
    });

    it('creates instance of ImmigrantsCampBuilding with proper index', function(){
      buildingsProvider.build('ImmigrantsCamp', 25, jasmine.createSpy());
      var buildings = buildingsProvider.getAll();

      expect(buildingsProvider.getAt(25) instanceof ImmigrantsCampBuilding).toBeTruthy();
    });
  });

  describe('processTick', function(){
    it('spoils previously built building', function(){
      buildingsProvider.build('ImmigrantsCamp', 78, jasmine.createSpy());
      buildingsProvider.processTick();

      expect(buildingsProvider.getAt(78).condition).toBe(0.99);
    });
  });

  describe('getAll', function(){
    it('returns all previously built buildings', function(){
      buildingsProvider.build('ImmigrantsCamp', 78, jasmine.createSpy());
      buildingsProvider.build('ImmigrantsCamp', 77, jasmine.createSpy());
      buildingsProvider.build('ImmigrantsCamp', 2, jasmine.createSpy());

      var buildings = buildingsProvider.getAll();

      expect(buildings[78] instanceof Building).toBeTruthy();
      expect(buildings[77] instanceof Building).toBeTruthy();
      expect(buildings[2] instanceof Building).toBeTruthy();
    });
  });


});