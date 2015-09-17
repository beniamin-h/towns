/**
 * Created by benek on 12/28/14.
 */
'use strict';

angular.module('towns').factory('Odds', ['Math', function (Math) {

  return {
    upper: function (max_value, probability_factor) {
      /**
       * @param Float max_value: upper boundary
       * @param Float probability_factor: exponential probability of choosing the *upper* value
       * @return Float: between 0 and `max_value`
       */
      var x = Math.random() * max_value;
      return Math.pow(x, 1 / probability_factor) * (max_value / Math.pow(max_value, 1 / probability_factor));
    },
    lower: function (max_value, probability_factor) {
      /**
       * @param Float max_value: upper boundary
       * @param Float probability_factor: exponential probability of choosing the *lower* value
       * @return Float: between 0 and `max_value`
       */
      var x = Math.random() * max_value;
      return Math.pow(x, probability_factor) * (max_value / Math.pow(max_value, probability_factor));
    },
    _instance: this
  };
}]);
