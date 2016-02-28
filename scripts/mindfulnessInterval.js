var exports = module.exports = {};
var schedule = require('node-schedule');
var stimulate = require('./helpers').stimulate;


exports.mindfulnessInterval = function(rule) {
  return schedule.scheduleJob(rule, function() {
    stimulate('vibrate', 'med');
  })
};
