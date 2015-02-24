/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Resources', ['Math', function (Math) {

  var Resources = function () {
  };

  Resources.prototype.resources = {
    straw: {
      display_name: 'Straw',
      gathering_accessibility: 1.0,
      gathering_tools_impact: {
        none: 1,
        wood: 1.5,
        stone: 2,
        iron: 2.5,
        steel: 3
      }
    },

    grass: {
      display_name: 'Grass',
      gathering_accessibility: 1.0,
      gathering_tools_impact: {
        none: 1,
        wood: 1.5,
        stone: 3,
        iron: 5,
        steel: 7
      }
    },

    grass_seeds: {
      display_name: 'Grass seeds',
      gathering_accessibility: 0.8,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    grains: {
      display_name: 'Grains',
      gathering_accessibility: 0.8,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    tree_seeds:{
      display_name: 'Tree seeds',
      gathering_accessibility: 0.8,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    wood_branches:{
      display_name: 'Wood branches',
      gathering_accessibility: 0.9,
      gathering_tools_impact: {
        none: 0.5,
        wood: 1.5,
        stone: 4,
        iron: 7,
        steel: 10
      }
    },

    soft_wood:{
      display_name: 'Soft wood',
      gathering_accessibility: 0.75,
      gathering_tools_impact: {
        none: 0.2,
        wood: 0.6,
        stone: 2,
        iron: 5,
        steel: 10
      }
    },

    hard_wood:{
      display_name: 'Hard wood',
      gathering_accessibility: 0.5,
      gathering_tools_impact: {
        none: 0,
        wood: 0.2,
        stone: 1,
        iron: 3,
        steel: 8
      }
    },

    linen:{
      display_name: 'Linen',
      gathering_accessibility: 0.8,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.4,
        iron: 1.5,
        steel: 1.6
      }
    },

    sand:{
      display_name: 'Sand',
      gathering_accessibility: 0.1,
      gathering_tools_impact: {
        none: 0.5,
        wood: 2,
        stone: 3,
        iron: 3.5,
        steel: 3.7
      }
    },

    stone:{
      display_name: 'Stone',
      gathering_accessibility: 0.05,
      gathering_tools_impact: {
        none: 0.4,
        wood: 0.8,
        stone: 1.5,
        iron: 4,
        steel: 10
      }
    },

    iron_ore:{
      display_name: 'Iron ore',
      gathering_accessibility: 0.01,
      gathering_tools_impact: {
        none: 0,
        wood: 0.1,
        stone: 0.4,
        iron: 1,
        steel: 2
      }
    },

    coal:{
      display_name: 'Coal',
      gathering_accessibility: 0.01,
      gathering_tools_impact: {
        none: 0,
        wood: 0.1,
        stone: 0.4,
        iron: 1,
        steel: 2
      }
    },

    animals:{
      display_name: 'Animals',
      gathering_accessibility: 0.1,
      gathering_tools_impact: {
        none: 0.1,
        wood: 0.5,
        stone: 1,
        iron: 1.6,
        steel: 2
      }
    },

    fur:{
      display_name: 'Fur',
      gathering_accessibility: 0.07,
      gathering_tools_impact: {
        none: 0.2,
        wood: 0.5,
        stone: 1,
        iron: 1.5,
        steel: 1.8
      }
    },

    eggs:{
      display_name: 'eggs',
      gathering_accessibility: 0.5,
      gathering_tools_impact: {
        none: 1,
        wood: 1.1,
        stone: 1.2,
        iron: 1.2,
        steel: 1.2
      },
      is_eatable: true
    },

    meat:{
      display_name: 'Meat',
      gathering_accessibility: 0.2,
      gathering_tools_impact: {
        none: 0.2,
        wood: 0.5,
        stone: 1,
        iron: 1.5,
        steel: 2
      },
      is_eatable: true
    },

    wool:{
      display_name: 'Wool',
      gathering_accessibility: 0.1,
      gathering_tools_impact: {
        none: 1,
        wood: 2,
        stone: 2.5,
        iron: 3,
        steel: 3.5
      }
    },

    sinew:{
      display_name: 'Sinew',
      gathering_accessibility: 0.05,
      gathering_tools_impact: {
        none: 0.1,
        wood: 0.4,
        stone: 0.5,
        iron: 0.7,
        steel: 0.8
      }
    },

    fat:{
      display_name: 'Fat',
      gathering_accessibility: 0.2,
      gathering_tools_impact: {
        none: 0,
        wood: 0.5,
        stone: 0.6,
        iron: 1.0,
        steel: 1.2
      }
    },

    bones:{
      display_name: 'Bones',
      gathering_accessibility: 0.5,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    big_bones:{
      display_name: 'Big bones',
      gathering_accessibility: 0.2,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    fruits:{
      display_name: 'Fruits',
      gathering_accessibility: 0.9,
      gathering_tools_impact: {
        none: 1,
        wood: 2,
        stone: 2.5,
        iron: 2.7,
        steel: 2.8
      },
      is_eatable: true
    },

    fruits_seeds:{
      display_name: 'Fruits seeds',
      gathering_accessibility: 0.8,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    vegetables:{
      display_name: 'Vegetables',
      gathering_accessibility: 1.0,
      gathering_tools_impact: {
        none: 1,
        wood: 1.5,
        stone: 2,
        iron: 2.5,
        steel: 3
      },
      is_eatable: true
    },

    vegetables_seeds:{
      display_name: 'Vegetables seeds',
      gathering_accessibility: 0.8,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    fresh_water:{
      display_name: 'Fresh water',
      gathering_accessibility: 0.1,
      gathering_tools_impact: {
        none: 0,
        wood: 1.0,
        stone: 1.2,
        iron: 1.3,
        steel: 1.35
      }
    },

    clay:{
      display_name: 'Clay',
      gathering_accessibility: 0.1,
      gathering_tools_impact: {
        none: 0.5,
        wood: 1,
        stone: 2,
        iron: 2.5,
        steel: 2.7
      }
    },

    herbs_seeds:{
      display_name: 'Herbs seeds',
      gathering_accessibility: 0.6,
      gathering_tools_impact: {
        none: 1,
        wood: 1.2,
        stone: 1.5,
        iron: 1.7,
        steel: 1.8
      }
    },

    herbs:{
      display_name: 'Herbs',
      gathering_accessibility: 0.7,
      gathering_tools_impact: {
        none: 1,
        wood: 1.5,
        stone: 1.9,
        iron: 2.2,
        steel: 2.3
      }
    }
  };

  Resources.prototype._setupEatableResourcesList = function (res_info, amounts) {
    var that = this;
    this.eatable_resources = Object.keys(this.resources).reduce(function (list, res_name) {
      if (that.resources[res_name].is_eatable) {
        list.push(res_name);
      }
    }, []);
  };

  var resources = new Resources();

  return {
    getResourcesInfo: function () {
      return resources.resources;
    },
    getResourceInfo: function (res_name) {
      return resources.resources[res_name];
    },
    getEatableResourcesNames: function () {
      return resources.eatable_resources;
    },
    getEnvResourceGrowth: function (resource_type, resource_amount) {

    },
    _instance: resources
  };
}]);
