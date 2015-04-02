/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('PersonDecider', ['LocalMarket', 'JobsList', 'Math',
    function (LocalMarket, JobsList, Math) {

  var PersonDecider = function (localMarket) {

  };

    PersonDecider.prototype.findJob = function (person) {
    var jobs = JobsList.getAvailableJobs(person);
    if (jobs.length) {
      person.changeJob(jobs[0]);
      return true;
    } else {
      return false;
    }
  };

  var decider = new PersonDecider(LocalMarket);

  return {
    findJob: function (person) {
      return decider.findJob(person);
    },
    _instance: decider
  };
}]);


