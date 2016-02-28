var schedule = require('node-schedule');
var stimulate = require('./helpers').stimulate;

var exports = module.exports = {};

exports.mindfulnessInterval = function(rule) {
  return schedule.scheduleJob(rule, function() {
    stimulate('vibrate', 'med');
  })
};
