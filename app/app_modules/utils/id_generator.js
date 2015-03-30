/**
 * Created by benek on 12/28/14.
 */
'use strict';

angular.module('towns').factory('IdGenerator', function () {

  var iterator = 0;

  return {
    nextInt: function () {
      return iterator++;
    },
    _instance: this
  };
});
