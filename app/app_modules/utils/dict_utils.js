/**
 * Created by benek on 12/28/14.
 */
'use strict';

angular.module('towns').factory('DictUtils', function () {

  return {
    setDictOpt: function (dict, selected_opt) {
      for (var opt in dict) {
        if (dict.hasOwnProperty(opt)) {
          dict[opt] = opt == selected_opt;
        }
      }
    },
    _factory: this
  };
});
