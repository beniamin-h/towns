/**
 * Created by benek on 12/28/14.
 */
'use strict';

angular.module('towns').factory('ArrayUtils', ['Math', function (Math) {

  return {
    range: function (n, start) {
      start = start || 0;
      return Array.apply(null, Array(n)).map(function (_, i) { return i + start; });
    },
    shuffle: function (o) {
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    },
    _instance: this
  };
}]);
