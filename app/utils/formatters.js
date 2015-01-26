/**
 * Created by benek on 12/28/14.
 */
'use strict';

angular.module('towns').factory('Formatters', function () {

  return {
    floatToPercents: function (value) {
      return Math.round(value * 100);
    },
    _factory: this
  };
});
