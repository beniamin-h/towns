/**
 * Created by benek on 12/25/14.
 */

describe('EnvironmentBlock', function () {
  beforeEach(module('towns'));

  var EnvironmentBlock, Environment;

  beforeEach(inject(function (_EnvironmentBlock_, _Environment_) {
    EnvironmentBlock = _EnvironmentBlock_;
    Environment = _Environment_;
  }));

  describe('gatherResources', function () {

    it('for max grass amount and none other resources ' +
    'returns specified resources amounts', function () {

      Environment.getResourceInfo('grass')['exploitable_resources'] = {
        straw: 0.1,
        grass: 0.8,
        grass_seeds: 0.05,
        grains: 0.01
      };

      var envBlock = new EnvironmentBlock(0);
      for (var res_name in envBlock.resources) {
        envBlock.resources[res_name] = 0;
      }
      envBlock.resources['grass'] = Environment.getResourceInfo('grass')['max_amount'];

      var gathered_resources = envBlock.gatherResources(jasmine.createSpy('person'));

      expect(gathered_resources['straw']).toBe(1);
      expect(gathered_resources['grass']).toBe(8);
      expect(gathered_resources['grass_seeds']).toBe(0.5);
      expect(gathered_resources['grains']).toBe(0.1);
    });

    it('for max grass amount, some grains and none other resources ' +
    'returns specified resources amounts', function () {

      Environment.getResourceInfo('grass')['exploitable_resources'] = {
        straw: 0.1,
        grass: 0.8,
        grass_seeds: 0.1,
        grains: 0.01
      };
      Environment.getResourceInfo('grains')['exploitable_resources'] = {
        grass_seeds: 0.5,
        grains: 1.0
      };

      var envBlock = new EnvironmentBlock(0);
      for (var res_name in envBlock.resources) {
        envBlock.resources[res_name] = 0;
      }
      envBlock.resources['grass'] = Environment.getResourceInfo('grass')['max_amount'];
      envBlock.resources['grains'] = Environment.getResourceInfo('grains')['max_amount'] / 10.0;

      var gathered_resources = envBlock.gatherResources(jasmine.createSpy('person'));

      expect(gathered_resources['straw']).toBe(1);
      expect(gathered_resources['grass']).toBe(8);
      expect(gathered_resources['grass_seeds']).toBe(1.5); // 10 * 0.1 + 10 * 0.5 / 10.0
      expect(gathered_resources['grains']).toBe(1.1); // 10 * 0.01 + 10 * 1.0 / 10.0
    });

    it('for a very little grains and none other resources ' +
    'returns specified resources amounts', function () {

      Environment.getResourceInfo('grains')['exploitable_resources'] = {
        grass_seeds: 0.5,
        grains: 1.0
      };
      Environment.getResourceInfo('grains')['max_amount'] = 10;

      var envBlock = new EnvironmentBlock(0);
      for (var res_name in envBlock.resources) {
        envBlock.resources[res_name] = 0;
      }
      envBlock.resources['grains'] = 0.1;

      var gathered_resources = envBlock.gatherResources(jasmine.createSpy('person'));

      expect(gathered_resources['grass_seeds']).toBe(0.05); // 10 * 0.5 * (0.1 / 10)
      expect(gathered_resources['grains']).toBe(0.1); // 10 * 1.0 * (0.1 / 10)
    });

  });



});