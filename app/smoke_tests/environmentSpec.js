/**
 * Created by benek on 12/25/14.
 */

describe('Environment', function () {
  beforeEach(module('towns'));

  var Environment, env;

  beforeEach(inject(function (_Environment_) {
    Environment = _Environment_;
    env = Environment._instance;
  }));

  describe('object instance', function () {

    it('has resources property as Object', function () {
      expect(typeof env.resources == 'object').toBeTruthy();
    });

    it('has resources_placement_order property as an Array', function () {
      expect(typeof env.resources_placement_order == 'object').toBeTruthy();
      expect(isNaN(env.resources_placement_order.length)).toBeFalsy();
    });

    describe('has resources and resources_placement_order properties which', function () {

      it('lengths are equal', function () {
        expect(Object.keys(env.resources).length === env.resources_placement_order.length).toBeTruthy();
      });

      it('keys of first are values of second', function () {
        Object.keys(env.resources).forEach(function (res_name) {
          expect(env.resources_placement_order.indexOf(res_name) != -1).toBeTruthy();
        });
      });

      it('values of second are keys of first', function () {
        env.resources_placement_order.forEach(function (res_name) {
          expect(Object.keys(env.resources).indexOf(res_name) != -1).toBeTruthy();
        });
      });
    });

    describe('has each resource in resources property which', function () {

      it('does not have any other keys than [growth_speed, growth_depends_on_neighbor_blocks, ' +
         'growth_seasons_impact, growth_other_resources_impact, max_amount, exploitable_resources, ' +
         'occurrence_requirements, occurrence_impact, block_type_occurrence_impact]', function () {
        for (var res in env.resources) {
          var expected_keys = ['growth_speed', 'growth_depends_on_neighbor_blocks',
            'growth_seasons_impact', 'growth_other_resources_impact', 'max_amount', 'exploitable_resources',
            'occurrence_requirements', 'occurrence_impact', 'block_type_occurrence_impact'];
          Object.keys(env.resources[res]).forEach(function (_key) {
            expect(expected_keys.indexOf(_key) !== -1).toBeTruthy();
          });
        }
      });

      it('has growth_speed defined as a Number', function () {
        for (var res in env.resources) {
          expect(env.resources[res].growth_speed).toEqual(jasmine.any(Number));
          expect(env.resources[res].growth_speed).not.toBeUndefined();
          expect(env.resources[res].growth_speed).not.toEqual(jasmine.any(Object));
        }
      });

      it('has growth_depends_on_neighbor_blocks defined as a boolean', function () {
        for (var res in env.resources) {
          expect(typeof env.resources[res].growth_depends_on_neighbor_blocks === 'boolean').toBeTruthy();
          expect(env.resources[res].growth_depends_on_neighbor_blocks).not.toBeUndefined();
          expect(env.resources[res].growth_depends_on_neighbor_blocks).not.toEqual(jasmine.any(Object));
          expect(env.resources[res].growth_depends_on_neighbor_blocks).not.toEqual(jasmine.any(Number));
        }
      });

      it('has growth_seasons_impact defined as a object or not defined', function () {
        for (var res in env.resources) {
          expect(typeof env.resources[res].growth_seasons_impact === 'object' ||
            typeof env.resources[res].growth_seasons_impact === 'undefined').toBeTruthy();
        }
      });

      describe('is defined as follows: If it has growth_seasons_impact', function () {

        it('its keys are equal to [winter, spring, summer, autumn]', function () {
          var expected_keys = ['winter', 'spring', 'summer', 'autumn'];
          for (var res in env.resources) {
            if (typeof env.resources[res].growth_seasons_impact !== 'undefined') {
              Object.keys(env.resources[res].growth_seasons_impact).forEach(function (_key) {
                expect(expected_keys.indexOf(_key) !== -1).toBeTruthy();
              });
            }
          }
        });

        it('there will be 4 values', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].growth_seasons_impact !== 'undefined') {
              expect(Object.keys(env.resources[res].growth_seasons_impact).length).toBe(4);
            }
          }
        });

        it('its values are defined as a Number', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].growth_seasons_impact !== 'undefined') {
              for (var season_name in env.resources[res].growth_seasons_impact) {
                expect(env.resources[res].growth_seasons_impact[season_name]).toEqual(jasmine.any(Number));
              }
            }
          }
        });
      });

      describe('is defined as follows: If it has growth_other_resources_impact', function () {

        it('its keys are resources names', function () {
          var expected_keys = Object.keys(env.resources);
          for (var res in env.resources) {
            if (typeof env.resources[res].growth_other_resources_impact !== 'undefined') {
              Object.keys(env.resources[res].growth_other_resources_impact).forEach(function (_key) {
                expect(expected_keys.indexOf(_key) !== -1).toBeTruthy();
              });
            }
          }
        });

        it('its values are defined as a Number', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].growth_other_resources_impact !== 'undefined') {
              for (var res_name in env.resources[res].growth_other_resources_impact) {
                expect(env.resources[res].growth_other_resources_impact[res_name]).toEqual(jasmine.any(Number));
              }
            }
          }
        });
      });

      it('has growth_other_resources_impact defined as a object or not defined', function () {
        for (var res in env.resources) {
          expect(typeof env.resources[res].growth_other_resources_impact === 'object' ||
            typeof env.resources[res].growth_other_resources_impact === 'undefined').toBeTruthy();
        }
      });

      it('has max_amount defined as a Number', function () {
        for (var res in env.resources) {
          expect(env.resources[res].max_amount).toEqual(jasmine.any(Number));
          expect(env.resources[res].max_amount).not.toBeUndefined();
          expect(env.resources[res].max_amount).not.toEqual(jasmine.any(Object));
        }
      });

      it('has exploitable_resources defined as a object', function () {
        for (var res in env.resources) {
          expect(env.resources[res].exploitable_resources).toEqual(jasmine.any(Object));
          expect(env.resources[res].exploitable_resources).not.toBeUndefined();
        }
      });

      it('is defined as follows: exploitable_resources values are Numbers', function () {
        for (var res in env.resources) {
          for (var res_name in env.resources[res].exploitable_resources) {
            expect(env.resources[res].exploitable_resources[res_name]).toEqual(jasmine.any(Number));
          }
        }
      });

      it('has occurrence_requirements defined as a object or not defined', function () {
        for (var res in env.resources) {
          expect(typeof env.resources[res].occurrence_requirements === 'object' ||
            typeof env.resources[res].occurrence_requirements === 'undefined').toBeTruthy();
        }
      });

      describe('is defined as follows: If it has occurrence_requirements', function () {

        it('its keys are resources names', function () {
          var expected_keys = Object.keys(env.resources);
          for (var res in env.resources) {
            if (typeof env.resources[res].occurrence_requirements !== 'undefined') {
              Object.keys(env.resources[res].occurrence_requirements).forEach(function (_key) {
                expect(expected_keys.indexOf(_key) !== -1).toBeTruthy();
              });
            }
          }
        });

        it('its values are defined as a Number', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].occurrence_requirements !== 'undefined') {
              for (var res_name in env.resources[res].occurrence_requirements) {
                expect(env.resources[res].occurrence_requirements[res_name]).toEqual(jasmine.any(Number));
              }
            }
          }
        });
      });

      it('has occurrence_impact defined as a object or not defined', function () {
        for (var res in env.resources) {
          expect(typeof env.resources[res].occurrence_impact === 'object' ||
            typeof env.resources[res].occurrence_impact === 'undefined').toBeTruthy();
        }
      });

      describe('is defined as follows: If it has occurrence_impact', function () {

        it('its keys are resources names', function () {
          var expected_keys = Object.keys(env.resources);
          for (var res in env.resources) {
            if (typeof env.resources[res].occurrence_impact !== 'undefined') {
              Object.keys(env.resources[res].occurrence_impact).forEach(function (_key) {
                expect(expected_keys.indexOf(_key) !== -1).toBeTruthy();
              });
            }
          }
        });

        it('its values are defined as a Number', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].occurrence_impact !== 'undefined') {
              for (var res_name in env.resources[res].occurrence_impact) {
                expect(env.resources[res].occurrence_impact[res_name]).toEqual(jasmine.any(Number));
              }
            }
          }
        });
      });

      it('has block_type_occurrence_impact defined as a object or not defined', function () {
        for (var res in env.resources) {
          expect(typeof env.resources[res].block_type_occurrence_impact === 'object' ||
            typeof env.resources[res].block_type_occurrence_impact === 'undefined').toBeTruthy();
        }
      });

      describe('is defined as follows: If it has block_type_occurrence_impact', function () {

        it('its keys are equal to [plains, hills, mountains, marsh, forests, grassland, wilderness]', function () {
          var expected_keys = ['plains', 'hills', 'mountains', 'marsh', 'forests', 'grassland', 'wilderness'];
          for (var res in env.resources) {
            if (typeof env.resources[res].block_type_occurrence_impact !== 'undefined') {
              Object.keys(env.resources[res].block_type_occurrence_impact).forEach(function (_key) {
                expect(expected_keys.indexOf(_key) !== -1).toBeTruthy();
              });
            }
          }
        });

        it('there will be 7 values', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].block_type_occurrence_impact !== 'undefined') {
              expect(Object.keys(env.resources[res].block_type_occurrence_impact).length).toBe(7);
            }
          }
        });

        it('its values are defined as a Number', function () {
          for (var res in env.resources) {
            if (typeof env.resources[res].block_type_occurrence_impact !== 'undefined') {
              for (var season_name in env.resources[res].block_type_occurrence_impact) {
                expect(env.resources[res].block_type_occurrence_impact[season_name]).toEqual(jasmine.any(Number));
              }
            }
          }
        });
      });

    });

    describe('has resources_placement_order', function () {

      it('defined according to resources occurrence requirements', function () {
        var placed = [];
        env.resources_placement_order.forEach(function (res_name) {
          if (env.resources[res_name].occurrence_requirements) {
            for (var req_res_name in env.resources[res_name].occurrence_requirements) {
              expect(placed.indexOf(req_res_name) !== -1).toBeTruthy();
            }
          }
          placed.push(res_name);
        });
      });

      it('defined according to resources occurrence impact', function () {
        var placed = [];
        env.resources_placement_order.forEach(function (res_name) {
          if (env.resources[res_name].occurrence_impact) {
            for (var req_res_name in env.resources[res_name].occurrence_impact) {
              expect(placed.indexOf(req_res_name) !== -1).toBeTruthy();
            }
          }
          placed.push(res_name);
        });
      });

    });

    describe('_checkResourceOccurrenceRequirements', function () {
      it('returns boolean', function () {
        var return_value = env._checkResourceOccurrenceRequirements(
          jasmine.createSpy('res_info'), jasmine.createSpy('amounts'));
        expect([true, false].indexOf(return_value) !== -1).toBeTruthy();
      });
    });

    describe('_checkResourceOccurrenceRequirements', function () {
      it('returns true if resource occurrence_requirements are empty', function () {
        var return_value = env._checkResourceOccurrenceRequirements(
          {'occurrence_requirements': {}}, jasmine.createSpy('amounts'));
        expect(return_value).toBe(true);
      });
    });

    describe('_checkResourceOccurrenceRequirements', function () {

      var resources;

      beforeEach(inject(function () {
        resources = env.resources;
        env.resources = {};
      }));

      afterEach(inject(function () {
        env.resources = resources;
      }));

      it('returns true if required resource amount ratio (0.9)' +
      'is lower than resource actual amount (91) to resource max_amount rate (100) - CASE 1', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.9
            }
          },
          resource_abc: {
            max_amount: 100
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 91});
        expect(return_value).toBe(true);
      });

      it('returns true if required resource amount ratio (0.1)' +
      'is lower than resource actual amount (100) to resource max_amount rate (100) - CASE 2', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.1
            }
          },
          resource_abc: {
            max_amount: 100
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 100});
        expect(return_value).toBe(true);
      });

      it('returns true if required resource amount ratio (0.5)' +
      'is lower than resource actual amount (99999) to resource max_amount rate (100000) - CASE 3', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.5
            }
          },
          resource_abc: {
            max_amount: 99999
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 100000});
        expect(return_value).toBe(true);
      });

      it('returns true if required resource amount ratio (0.00001)' +
      'is lower than resource actual amount (1) to resource max_amount rate (1000) - CASE 4', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.00001
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 1});
        expect(return_value).toBe(true);
      });

      it('returns true if required resource amount ratio (0.0)' +
      'is lower than resource actual amount (1) to resource max_amount rate (100) - CASE 5', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.0
            }
          },
          resource_abc: {
            max_amount: 100
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 1});
        expect(return_value).toBe(true);
      });

      it('returns false if required resource amount ratio (0.7)' +
      'is not lower than resource actual amount (69) to resource max_amount rate (100) - CASE 1', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.7
            }
          },
          resource_abc: {
            max_amount: 100
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 69});
        expect(return_value).toBe(false);
      });

      it('returns false if required resource amount ratio (0.1)' +
      'is not lower than resource actual amount (1) to resource max_amount rate (11) - CASE 2', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 0.1
            }
          },
          resource_abc: {
            max_amount: 11
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 1});
        expect(return_value).toBe(false);
      });

      it('returns false if required resource amount ratio (1.0)' +
      'is not lower than resource actual amount (999) to resource max_amount rate (1000) - CASE 3', function () {
        env.resources = {
          resource_xxx: {
            occurrence_requirements: {
              resource_abc: 1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._checkResourceOccurrenceRequirements(
          env.resources['resource_xxx'], {'resource_abc': 999});
        expect(return_value).toBe(false);
      });
    });

    describe('_getResourceOccurrenceImpact', function () {

      var resources;

      beforeEach(inject(function () {
        resources = env.resources;
        env.resources = {};
      }));

      afterEach(inject(function () {
        env.resources = resources;
      }));

      it('returns 1.0 if resource occurrence_impact is empty', function () {
        var return_value = env._getResourceOccurrenceImpact(
          {'occurrence_impact': {}}, jasmine.createSpy('amounts'));
        expect(return_value).toBe(1.0);
      });

      it('returns 0.999 if resource occurrence_impact is 1.0, ' +
      'its amount is 999 and its max_amount is 1000 - CASE 1', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 999});
        expect(return_value).toBe(0.999);
      });

      it('returns 1.0 if resource occurrence_impact is 0.999, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 2', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.999
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 1.0 if resource occurrence_impact is 0.5, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 3', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 1.0 if resource occurrence_impact is 0.00001, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 4', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.00001
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 1.0 if resource occurrence_impact is 0.0, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 5', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 1.0 if resource occurrence_impact is 1.0, ' +
      'its amount is 10 and its max_amount is 10 - CASE 6', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0
            }
          },
          resource_abc: {
            max_amount: 10
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10});
        expect(return_value).toBe(1.0);
      });

      it('returns 0.5 if resource occurrence_impact is 1.0, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 7', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBe(0.5);
      });

      it('returns 0.75 if resource occurrence_impact is 0.5, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 8', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBe(0.75);
      });

      it('returns 0.95 if resource occurrence_impact is 0.1, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 9', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.1
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBeCloseTo(0.95, 2);
      });

      it('returns 0.55 if resource occurrence_impact is 0.9, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 10', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.9
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBeCloseTo(0.55, 2);
      });

      it('returns 0.95 if resource occurrence_impact is 0.5, ' +
      'its amount is 900 and its max_amount is 1000 - CASE 11', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 900});
        expect(return_value).toBeCloseTo(0.95, 2);
      });

      it('returns 0.97 if resource occurrence_impact is 0.3, ' +
      'its amount is 900 and its max_amount is 1000 - CASE 12', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.3
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 900});
        expect(return_value).toBeCloseTo(0.97, 2);
      });

      it('returns 0.73 if resource occurrence_impact is 0.3, ' +
      'its amount is 100 and its max_amount is 1000 - CASE 13', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.3
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 100});
        expect(return_value).toBeCloseTo(0.73, 2);
      });

      it('returns 0.28 if resource occurrence_impact is 0.8, ' +
      'its amount is 100 and its max_amount is 1000 - CASE 14', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.8
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 100});
        expect(return_value).toBeCloseTo(0.28, 2);
      });

      it('returns 0.19 if resource occurrence_impact is 0.9, ' +
      'its amount is 100 and its max_amount is 1000 - CASE 15', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.9
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 100});
        expect(return_value).toBeCloseTo(0.19, 2);
      });

      it('returns 1.0 if first resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 16', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000, 'resource_xyz': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 1.0 if first resource occurrence_impact is 0.0, ' +
      'its amount is 0, its max_amount is 1000 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 17', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.0,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 1.0 if first resource occurrence_impact is 1.0, ' +
      'its amount is 1, its max_amount is 1 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 18', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 1
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1000});
        expect(return_value).toBe(1.0);
      });

      it('returns 0.5 if first resource occurrence_impact is 1.0, ' +
      'its amount is 1, its max_amount is 2 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 19', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 2
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1000});
        expect(return_value).toBe(0.5);
      });

      it('returns 0.33 if first resource occurrence_impact is 1.0, ' +
      'its amount is 1, its max_amount is 3 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 20', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 3
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1000});
        expect(return_value).toBeCloseTo(0.33, 2);
      });

      it('returns 0.67 if first resource occurrence_impact is 0.5, ' +
      'its amount is 1, its max_amount is 3 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 21', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 3
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1000});
        expect(return_value).toBeCloseTo(0.67, 2);
      });

      it('returns 0.93 if first resource occurrence_impact is 0.1, ' +
      'its amount is 1, its max_amount is 3 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 22', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.1,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 3
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1000});
        expect(return_value).toBeCloseTo(0.93, 2);
      });

      it('returns 0.5 if first resource occurrence_impact is 1.0, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is 1.0, ' +
      'its amount is 500, its max_amount is 1000 - CASE 23', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 1.0
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 500});
        expect(return_value).toBe(0.5);
      });

      it('returns 0.55 if first resource occurrence_impact is 1.0, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 24', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 100});
        expect(return_value).toBe(0.55);
      });

      it('returns 0.55 if first resource occurrence_impact is 0.5, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 25', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 100});
        expect(return_value).toBe(0.55);
      });

      it('returns 0.5225 if first resource occurrence_impact is 0.5, ' +
      'its amount is 9, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 26', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 9, 'resource_xyz': 100});
        expect(return_value).toBe(0.5225);
      });

      it('returns 0.3025 if first resource occurrence_impact is 0.5, ' +
      'its amount is 1, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 27', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 100});
        expect(return_value).toBeCloseTo(0.3025, 4);
      });

      it('returns 0.275 if first resource occurrence_impact is 0.5, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 28', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.5,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 100});
        expect(return_value).toBe(0.275);
      });

      it('returns 0 if first resource occurrence_impact is 1.0, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 29', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 100});
        expect(return_value).toBe(0);
      });

      it('returns 0.055 if first resource occurrence_impact is 0.9, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 30', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.9,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 100});
        expect(return_value).toBeCloseTo(0.055, 3);
      });

      it('returns 0.81 if first resource occurrence_impact is 0.1, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 0, its max_amount is 1000 - CASE 31', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.1,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 0});
        expect(return_value).toBeCloseTo(0.81, 3);
      });

      it('returns 0.81009 if first resource occurrence_impact is 0.1, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 1, its max_amount is 1000 - CASE 32', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.1,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 1});
        expect(return_value).toBeCloseTo(0.81009, 5);
      });

      it('returns 0.819091 if first resource occurrence_impact is 0.1, ' +
      'its amount is 1, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 1, its max_amount is 1000 - CASE 33', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.1,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1});
        expect(return_value).toBeCloseTo(0.819091, 6);
      });

      it('returns 0.9001 if first resource occurrence_impact is 0.9, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 1, its max_amount is 1000 - CASE 34', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.9,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 1});
        expect(return_value).toBeCloseTo(0.9001, 4);
      });

      it('returns 0.91 if first resource occurrence_impact is 0.9, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 100, its max_amount is 1000 - CASE 35', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.9,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 100});
        expect(return_value).toBe(0.91);
      });

      it('returns 0.9999 if first resource occurrence_impact is 0.9, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 999, its max_amount is 1000 - CASE 36', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 0.9,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 999});
        expect(return_value).toBe(0.9999);
      });

      it('returns 0 if resource occurrence_impact is -1.0, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 37', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(0);
      });

      it('returns 0.5 if resource occurrence_impact is -0.5, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 38', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.5
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(0.5);
      });

      it('returns 0.7 if resource occurrence_impact is -0.3, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 39', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.3
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBe(0.7);
      });

      it('returns 0.2 if resource occurrence_impact is -0.8, ' +
      'its amount is 1000 and its max_amount is 1000 - CASE 40', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.8
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1000});
        expect(return_value).toBeCloseTo(0.20, 2);
      });

      it('returns 1 if resource occurrence_impact is -1.0, ' +
      'its amount is 0 and its max_amount is 1000 - CASE 41', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0});
        expect(return_value).toBe(1);
      });

      it('returns 0.999 if resource occurrence_impact is -1.0, ' +
      'its amount is 1 and its max_amount is 1000 - CASE 42', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1});
        expect(return_value).toBe(0.999);
      });

      it('returns 0.5 if resource occurrence_impact is -1.0, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 43', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBe(0.5);
      });

      it('returns 0.55 if resource occurrence_impact is -0.9, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 44', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.9
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBe(0.55);
      });

      it('returns 0.7 if resource occurrence_impact is -0.6, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 45', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.6
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBe(0.7);
      });

      it('returns 0.95 if resource occurrence_impact is -0.1, ' +
      'its amount is 500 and its max_amount is 1000 - CASE 46', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.1
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 500});
        expect(return_value).toBe(0.95);
      });

      it('returns 0.999001 if resource occurrence_impact is -0.001, ' +
      'its amount is 999 and its max_amount is 1000 - CASE 47', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.001
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 999});
        expect(return_value).toBe(0.999001);
      });

      it('returns 0.999999 if resource occurrence_impact is -0.001, ' +
      'its amount is 1 and its max_amount is 1000 - CASE 48', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.001
            }
          },
          resource_abc: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1});
        expect(return_value).toBe(0.999999);
      });

      it('returns 0.999 if first resource occurrence_impact is 1.0, ' +
      'its amount is 10, its max_amount is 10 ' +
      'and second resource occurrence_impact is -0.1, ' +
      'its amount is 10, its max_amount is 1000 - CASE 49', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: 1.0,
              resource_xyz: -0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 10});
        expect(return_value).toBe(0.999);
      });

      it('returns 0.09 if first resource occurrence_impact is -1.0, ' +
      'its amount is 9, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 10, its max_amount is 1000 - CASE 50', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 9, 'resource_xyz': 10});
        expect(return_value).toBeCloseTo(0.09, 2);
      });

      it('returns 0.901 if first resource occurrence_impact is -1.0, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 10, its max_amount is 1000 - CASE 51', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 10});
        expect(return_value).toBe(0.901);
      });

      it('returns 1.0 if first resource occurrence_impact is -1.0, ' +
      'its amount is 0, its max_amount is 10 ' +
      'and second resource occurrence_impact is -1.0, ' +
      'its amount is 0, its max_amount is 1000 - CASE 52', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0,
              resource_xyz: -1.0
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 0, 'resource_xyz': 0});
        expect(return_value).toBe(1);
      });

      it('returns 0.8991 if first resource occurrence_impact is -1.0, ' +
      'its amount is 1, its max_amount is 10 ' +
      'and second resource occurrence_impact is -1.0, ' +
      'its amount is 1, its max_amount is 1000 - CASE 53', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0,
              resource_xyz: -1.0
            }
          },
          resource_abc: {
            max_amount: 10
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1});
        expect(return_value).toBe(0.8991);
      });

      it('returns 0.998001 if first resource occurrence_impact is -1.0, ' +
      'its amount is 1, its max_amount is 1000 ' +
      'and second resource occurrence_impact is -1.0, ' +
      'its amount is 1, its max_amount is 1000 - CASE 54', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -1.0,
              resource_xyz: -1.0
            }
          },
          resource_abc: {
            max_amount: 1000
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 1, 'resource_xyz': 1});
        expect(return_value).toBe(0.998001);
      });

      it('returns 0.25 if first resource occurrence_impact is -0.5, ' +
      'its amount is 100, its max_amount is 100 ' +
      'and second resource occurrence_impact is -0.5, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 55', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.5,
              resource_xyz: -0.5
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 100, 'resource_xyz': 1000});
        expect(return_value).toBe(0.25);
      });

      it('returns 0.475 if first resource occurrence_impact is -0.5, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is -0.5, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 56', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.5,
              resource_xyz: -0.5
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 1000});
        expect(return_value).toBeCloseTo(0.475, 3);
      });

      it('returns 0.9025 if first resource occurrence_impact is -0.5, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is -0.5, ' +
      'its amount is 100, its max_amount is 1000 - CASE 56', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.5,
              resource_xyz: -0.5
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 100});
        expect(return_value).toBeCloseTo(0.9025, 4);
      });

      it('returns 0.9009 if first resource occurrence_impact is -0.1, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 100, its max_amount is 1000 - CASE 57', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.1,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 100});
        expect(return_value).toBe(0.9009);
      });

      it('returns 0.99 if first resource occurrence_impact is -0.1, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 58', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.1,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 1000});
        expect(return_value).toBe(0.99);
      });

      it('returns 0.95 if first resource occurrence_impact is -0.5, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is 0.1, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 59', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.5,
              resource_xyz: 0.1
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 1000});
        expect(return_value).toBeCloseTo(0.95, 2);
      });

      it('returns 0.95 if first resource occurrence_impact is -0.5, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 60', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.5,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 1000});
        expect(return_value).toBeCloseTo(0.95, 2);
      });

      it('returns 0.901 if first resource occurrence_impact is -0.99, ' +
      'its amount is 10, its max_amount is 100 ' +
      'and second resource occurrence_impact is 0.5, ' +
      'its amount is 1000, its max_amount is 1000 - CASE 61', function () {
        env.resources = {
          resource_xxx: {
            occurrence_impact: {
              resource_abc: -0.99,
              resource_xyz: 0.5
            }
          },
          resource_abc: {
            max_amount: 100
          },
          resource_xyz: {
            max_amount: 1000
          }
        };
        var return_value = env._getResourceOccurrenceImpact(
          env.resources['resource_xxx'], {'resource_abc': 10, 'resource_xyz': 1000});
        expect(return_value).toBe(0.901);
      });

    });

    describe('_polishResourceAmount', function () {

      var _random, _Math;

      beforeEach(inject(function (_Math_) {
        _Math = _Math_;
        _random = _Math_.random;
      }));

      afterEach(inject(function () {
        _Math.random = _random;
      }));

      it('returns 8 if random returns 0.1, max_amount is 10 and current amount is 10 - CASE 1', function () {
        _Math.random = function () { return 0.1; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 10);
        expect(return_value).toBe(8);
      });

      it('returns 10 if random returns 0.5, max_amount is 10 and current amount is 10 - CASE 2', function () {
        _Math.random = function () { return 0.5; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 10);
        expect(return_value).toBe(10);
      });

      it('returns 9.9 if random returns 0.9, max_amount is 10 and current amount is 10 - CASE 3', function () {
        _Math.random = function () { return 0.9; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 10);
        expect(return_value).toBe(9.9);
      });

      it('returns 0.8 if random returns 0.1, max_amount is 10 and current amount is 1 - CASE 4', function () {
        _Math.random = function () { return 0.1; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 1);
        expect(return_value).toBe(0.8);
      });

      it('returns 4 if random returns 0.1, max_amount is 10 and current amount is 5 - CASE 5', function () {
        _Math.random = function () { return 0.1; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 5);
        expect(return_value).toBe(4);
      });

      it('returns 4.25 if random returns 0.2, max_amount is 10 and current amount is 5 - CASE 6', function () {
        _Math.random = function () { return 0.2; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 5);
        expect(return_value).toBe(4.25);
      });

      it('returns 5 if random returns 0.5, max_amount is 10 and current amount is 5 - CASE 7', function () {
        _Math.random = function () { return 0.5; };
        var return_value = env._polishResourceAmount({max_amount: 10}, 5);
        expect(return_value).toBe(5);
      });
    });

    describe('getEnvResourcesInitialAmounts', function () {

      it('returns all resources amounts', function () {
        var return_value = env.getEnvResourcesInitialAmounts();
        for (res_name in env.resources) {
          expect(Object.keys(return_value).indexOf(res_name) > -1).toBeTruthy();
          expect(return_value[res_name]).not.toBeUndefined();
          expect(return_value[res_name]).toEqual(jasmine.any(Number));
        }
      });

      describe('for each resource', function () {

        describe('if it has any occurrence_requirements ' +
        'and _checkResourceOccurrenceRequirements returns false', function () {

          var setup_test = function () {
            env._checkResourceOccurrenceRequirements =
              jasmine.createSpy('_checkResourceOccurrenceRequirementsMockedFun').andReturn(false);
            for (var res_name in env.resources) {
              env.resources[res_name].occurrence_requirements = {};
            }
          };

          it('returns 0 amounts', function () {
            setup_test();
            var amounts = env.getEnvResourcesInitialAmounts();
            for (res_name in amounts) {
              expect(amounts[res_name]).toBe(0);
            }
          });

          it('_checkResourceOccurrenceRequirements is called as many times as number of resources', function () {
            setup_test();
            var amounts = env.getEnvResourcesInitialAmounts();
            expect(env._checkResourceOccurrenceRequirements.callCount).toBe(Object.keys(env.resources).length);
          });

          it('returns Array with as many elements as number of resources', function () {
            setup_test();
            var amounts = env.getEnvResourcesInitialAmounts();
            expect(Object.keys(amounts).length).toBe(Object.keys(env.resources).length);
          });
        });

        describe('if it has any occurrence_requirements and occurrence_impact and' +
        '_checkResourceOccurrenceRequirements returns true', function () {

          var polish_resource_amount_return_value = jasmine.createSpy('polish_resource_amount_return_value'),
            setup_test = function () {
              env._checkResourceOccurrenceRequirements =
                jasmine.createSpy('_checkResourceOccurrenceRequirementsMockedFun').andReturn(true);
              env._polishResourceAmount =
                jasmine.createSpy('_polishResourceAmountMockedFun').andReturn(polish_resource_amount_return_value);
              for (var res_name in env.resources) {
                env.resources[res_name].occurrence_requirements = {};
                env.resources[res_name].occurrence_impact = {};
              }
            };

          it('_polishResourceAmount is called as many times as number of resources', function () {
            setup_test();
            var amounts = env.getEnvResourcesInitialAmounts();
            expect(env._polishResourceAmount.callCount).toBe(Object.keys(env.resources).length);
          });

          it('returns value returned from _polishResourceAmount', function () {
            setup_test();
            var amounts = env.getEnvResourcesInitialAmounts();
            for (res_name in amounts) {
              expect(amounts[res_name]).toBe(polish_resource_amount_return_value);
            }
          });
        });

        describe('if it has any occurrence_requirements and occurrence_impact and' +
        '_checkResourceOccurrenceRequirements returns true', function () {

        });
      });

      describe('for fixture_1', function () {

        var _random, _Math,
          fixture_1 = {
            resources : {
              res_abc: {
                growth_speed: 0.05,
                growth_depends_on_neighbor_blocks: false,
                growth_seasons_impact: {
                  winter: 0.8,
                  spring: 1.0,
                  summer: 1.0,
                  autumn: 0.8
                },
                max_amount: 500,
                exploitable_resources: {}
              },
              res_xyz: {
                growth_speed: 0.05,
                growth_depends_on_neighbor_blocks: false,
                growth_seasons_impact: {
                  winter: 0.8,
                  spring: 1.0,
                  summer: 1.0,
                  autumn: 0.8
                },
                max_amount: 10,
                exploitable_resources: {},
                occurrence_impact: {
                  res_abc: 0.7
                }
              }
            },
            resources_placement_order: ['res_abc', 'res_xyz']
          };

        beforeEach(inject(function (_Math_) {
          _Math = _Math_;
          _random = _Math_.random;
        }));

        afterEach(inject(function () {
          _Math.random = _random;
        }));

        it('returns max amounts if Math.random returns always 1.0', function () {

          env.resources = fixture_1.resources;
          env.resources_placement_order = fixture_1.resources_placement_order;
          _Math.random = function () { return 1.0; };

          var amounts = env.getEnvResourcesInitialAmounts();

          for (var res_name in fixture_1.resources) {
            expect(amounts[res_name]).toBe(fixture_1.resources[res_name].max_amount);
          }

        });

        it('for res_abc returns 250 if Math.random returns always 0.5', function () {

          env.resources = fixture_1.resources;
          env.resources_placement_order = fixture_1.resources_placement_order;
          _Math.random = function () { return 0.5; };

          var amounts = env.getEnvResourcesInitialAmounts();

          expect(amounts['res_abc']).toBe(250);

        });

        it('for res_xyz returns 6.5 if Math.random returns always 0.5', function () {

          env.resources = fixture_1.resources;
          env.resources_placement_order = fixture_1.resources_placement_order;
          _Math.random = function () { return 0.5; };

          var amounts = env.getEnvResourcesInitialAmounts();

          expect(amounts['res_xyz']).toBe(6.5);

        });

      });
    });

  });



});