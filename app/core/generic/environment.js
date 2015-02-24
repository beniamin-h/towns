/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Environment', ['Math', function (Math) {

  var Environment = function () {

  };

  Environment.prototype.resources = {
    humus: {
      growth_speed: 0.05,
      growth_depends_on_neighbor_blocks: false,
      growth_seasons_impact: {
        winter: 0.8,
        spring: 1.0,
        summer: 1.0,
        autumn: 0.8
      },
      growth_other_resources_impact: {
        water: 0.9,
        stone: 0.3,
        humus: 0.1,
        trees: 1.0,
        grass: 1.0,
        grains: 0.5,
        games: 0.7
      },
      max_amount: 500000,
      exploitable_resources: {},
      occurrence_requirements: {
        water: 0.1
      },
      occurrence_impact: {
        water: 0.1
      }
    },

    grass: {
      growth_speed: 20,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0,
        spring: 1.0,
        summer: 0.5,
        autumn: 0.2
      },
      growth_other_resources_impact: {
        water: 1.0,
        grass: 0.1,
        stone: 0.3,
        humus: 1.0,
        trees: -0.5,
        grains: 1.0,
        games: -0.4
      },
      max_amount: 5000,
      exploitable_resources: {
        straw: 0.1,
        grass: 1.0,
        grass_seeds: 0.05,
        grains: 0.01
      },
      occurrence_requirements: {
        humus: 0.01,
        water: 0.01
      },
      occurrence_impact: {
        humus: 0.5,
        water: 0.1,
        trees: -0.1
      },
      block_type_occurrence_impact: {
        plains: 1.0,
        hills: 0.5,
        mountains: 0.1,
        marsh: 0.7,
        forests: 0.4,
        grassland: 1.0,
        wilderness: 0.001
      }
    },

    trees: {
      growth_speed: 5,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0.5,
        spring: 0.8,
        summer: 1.0,
        autumn: 0.7
      },
      growth_other_resources_impact: {
        water: 1.0,
        stone: 0.5,
        humus: 1.0,
        trees: -0.1,
        games: -0.1
      },
      max_amount: 10000,
      exploitable_resources: {
        tree_seeds: 0.05,
        wood_branches: 1.0,
        soft_wood: 0.9,
        hard_wood: 0.5,
        linen: 0.1
      },
      occurrence_requirements: {
        humus: 0.05,
        water: 0.02
      },
      occurrence_impact: {
        humus: 0.5,
        water: 0.2
      },
      block_type_occurrence_impact: {
        plains: 1.0,
        hills: 0.5,
        mountains: 0.01,
        marsh: 0.9,
        forests: 1.0,
        grassland: 0.5,
        wilderness: 0.001
      }
    },

    stone: {
      growth_speed: 0.01,
      growth_depends_on_neighbor_blocks: false,
      growth_seasons_impact: {
        winter: 0.1,
        spring: -0.05,
        summer: -0.1,
        autumn: -0.05
      },
      growth_other_resources_impact: {
        water: 1.0,
        stone: 1.0,
        humus: -0.5,
        trees: -1.0,
        grass: -1.0
      },
      max_amount: 1000000,
      exploitable_resources: {
        sand: 0.02,
        stone: 1.0
      },
      block_type_occurrence_impact: {
        plains: 0.1,
        hills: 0.7,
        mountains: 1.0,
        marsh: 0.1,
        forests: 0.2,
        grassland: 0.5,
        wilderness: 1.0
      }
    },

    iron_ore: {
      growth_speed: 0,
      growth_depends_on_neighbor_blocks: false,
      growth_seasons_impact: {
        winter: 0,
        spring: 0,
        summer: 0,
        autumn: 0
      },
      growth_other_resources_impact: {},
      max_amount: 100000,
      exploitable_resources: {
        iron_ore: 1.0
      },
      occurrence_requirements: {
        stone: 0.1
      },
      occurrence_impact: {
        stone: 0.1
      }
    },

    coal: {
      growth_speed: 0.001,
      growth_depends_on_neighbor_blocks: false,
      growth_other_resources_impact: {
        humus: 0.5,
        trees: 1.0,
        grass: 0.8
      },
      max_amount: 100000,
      exploitable_resources: {
        coal: 1.0
      }
    },

    grains: {
      growth_speed: 0.5,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0,
        spring: 1.0,
        summer: 0.5,
        autumn: 0.2
      },
      growth_other_resources_impact: {
        water: 1.0,
        grains: 1.0,
        humus: 0.2,
        grass: 0.5,
        games: -0.3
      },
      max_amount: 1000,
      exploitable_resources: {
        grains: 1.0
      },
      occurrence_requirements: {
        humus: 0.02,
        water: 0.02,
        grass: 0.01
      },
      occurrence_impact: {
        humus: 0.5,
        water: 0.5,
        grass: 0.1
      }
    },

    games: {
      growth_speed: 5.0,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0.7,
        spring: 1.0,
        summer: 1.0,
        autumn: 0.8
      },
      growth_other_resources_impact: {
        water: 1.0,
        grains: 0.9,
        grass: 0.8,
        trees: 0.7,
        games: 1.0
      },
      max_amount: 10000,
      exploitable_resources: {
        animals: 1.0,
        fur: 0.05,
        eggs: 0.1,
        meat: 1.0,
        wool: 0.02,
        sinew: 0.05,
        fat: 0.5,
        bones: 0.1,
        big_bones: 0.05
      },
      occurrence_requirements: {
        trees: 0.05,
        grass: 0.1,
        water: 0.05
      },
      occurrence_impact: {
        trees: 0.1,
        grass: 0.5,
        water: 0.5,
        fruits: 1.0,
        vegetables: 1.0
      }
    },

    fruits: {
      growth_speed: 1.0,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0.1,
        spring: 0.8,
        summer: 1.0,
        autumn: 0.8
      },
      growth_other_resources_impact: {
        water: 1.0,
        humus: 1.0,
        grains: 0.5,
        trees: -0.3,
        stone: -0.1,
        games: -0.5
      },
      max_amount: 50000,
      exploitable_resources: {
        wood_branches: 0.8,
        fruits: 1.0,
        fruits_seeds: 0.05
      },
      occurrence_requirements: {
        humus: 0.1,
        grass: 0.01,
        water: 0.1
      },
      occurrence_impact: {
        humus: 0.5,
        water: 0.5,
        grass: 0.1,
        trees: -0.1,
        stone: -0.05
      }
    },

    vegetables: {
      growth_speed: 1.5,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0.1,
        spring: 1.0,
        summer: 0.9,
        autumn: 0.8
      },
      growth_other_resources_impact: {
        water: 1.0,
        humus: 1.0,
        grains: 0.5,
        trees: -0.2,
        stone: -0.1,
        games: -0.4
      },
      max_amount: 75000,
      exploitable_resources: {
        wood_branches: 0.7,
        vegetables: 1.0,
        vegetables_seeds: 0.05
      },
      occurrence_requirements: {
        humus: 0.08,
        grass: 0.01,
        water: 0.08
      },
      occurrence_impact: {
        humus: 0.5,
        water: 0.5,
        grass: 0.1,
        trees: -0.1,
        stone: -0.05
      }
    },

    water: {
      growth_speed: 1.0,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: -1.0,
        spring: 1.0,
        summer: -1.0,
        autumn: 1.0
      },
      growth_other_resources_impact: {
        water: 1.0,
        humus: 1.0,
        stone: -1.0,
        trees: 0.5,
        grass: 0.4,
        games: -0.1
      },
      max_amount: 1000000,
      exploitable_resources: {
        sand: 0.1,
        fresh_water: 1.0
      },
      block_type_occurrence_impact: {
        plains: 0.4,
        hills: 0.7,
        mountains: 0.8,
        marsh: 1.0,
        forests: 0.7,
        grassland: 0.5,
        wilderness: 0.1
      }
    },

    clay: {
      growth_speed: 0.1,
      growth_depends_on_neighbor_blocks: false,
      growth_other_resources_impact: {
        water: 1.0,
        humus: 1.0,
        stone: -0.3,
        trees: 0.1,
        grass: 0.05
      },
      max_amount: 100000,
      exploitable_resources: {
        clay: 1.0
      },
      occurrence_requirements: {
        water: 0.3,
        humus: 0.3
      },
      occurrence_impact: {
        humus: 1.0,
        water: 1.0
      }
    },

    herbs: {
      growth_speed: 0.1,
      growth_depends_on_neighbor_blocks: true,
      growth_seasons_impact: {
        winter: 0.1,
        spring: 0.8,
        summer: 1.0,
        autumn: 0.8
      },
      growth_other_resources_impact: {
        water: 1.0,
        humus: 1.0,
        stone: 0.1,
        trees: 0.1,
        grass: 0.05,
        games: -0.1
      },
      max_amount: 1000,
      exploitable_resources: {
        wood_branches: 0.1,
        herbs_seeds: 0.05,
        herbs: 1.0
      },
      occurrence_requirements: {
        humus: 0.2,
        grass: 0.1,
        water: 0.2
      },
      occurrence_impact: {
        humus: 1.0,
        water: 1.0,
        grass: 0.5,
        trees: 0.1
      }
    }
  };

  Environment.prototype.resources_placement_order = [
    'stone', 'iron_ore', 'coal', 'water', 'humus', 'clay', 'trees', 'grass', 'grains', 'fruits', 'vegetables',
    'games', 'herbs'
  ];

  Environment.prototype._checkResourceOccurrenceRequirements = function (res_info, amounts) {
    for (var req_res_name in res_info.occurrence_requirements) {
      var required_amount = res_info.occurrence_requirements[req_res_name];
      if (amounts[req_res_name] / this.resources[req_res_name].max_amount < required_amount) {
        return false;
      }
    }
    return true;
  };

  Environment.prototype._getResourceOccurrenceImpact = function (res_info, amounts) {
    var imps = res_info.occurrence_impact,
        amount_ratio = 1;
    for (var imp_res_name in imps) {
      var imp_res_amount_ratio = amounts[imp_res_name] / this.resources[imp_res_name].max_amount;
      var impact_ratio = imps[imp_res_name];
      if (impact_ratio > 0) {
        var non_impact_ratio = 1 - impact_ratio;
        amount_ratio = amount_ratio * imp_res_amount_ratio * impact_ratio +
          amount_ratio * non_impact_ratio;
      } else {
        var _impact_ratio = impact_ratio + 1;
        var _imp_res_amount_ratio = 1 - imp_res_amount_ratio;
        _imp_res_amount_ratio += imp_res_amount_ratio * _impact_ratio;
        amount_ratio = amount_ratio * _imp_res_amount_ratio;
      }
    }
    return amount_ratio;
  };

  Environment.prototype._polishResourceAmount = function (res_info, amount) {
    amount *= 0.75 + 0.5 * Math.random();
    if (amount > res_info.max_amount) {
      amount = res_info.max_amount * (0.9 + 0.1 * Math.random());
    }
    return amount;
  };

  Environment.prototype.getEnvResourcesInitialAmounts = function () {
    var amounts = {},
      that = this;

    this.resources_placement_order.forEach(function (res_name) {
      var res_info = that.resources[res_name];

      if (res_info.occurrence_requirements && !that._checkResourceOccurrenceRequirements(res_info, amounts)) {
        amounts[res_name] = 0;
      } else if (res_info.occurrence_impact) {
        amounts[res_name] = that._polishResourceAmount(
          res_info, res_info.max_amount * that._getResourceOccurrenceImpact(res_info, amounts));
      } else {
        amounts[res_name] = res_info.max_amount * Math.random();
      }
    });

    return amounts;
  };

  var environment = new Environment();

  return {
    getEnvResourcesInfo: function () {
      return environment.resources;
    },
    getEnvResourceInfo: function (res_name) {
      return environment.resources[res_name];
    },
    getEnvResourcesInitialAmounts: function () {
      return environment.getEnvResourcesInitialAmounts();
    },
    getEnvResourceGrowth: function (resource_type, resource_amount) {

    },
    _instance: environment
  };
}]);
