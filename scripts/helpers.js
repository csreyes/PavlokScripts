var request = require('request');

function stimulate(stimulus, value) {
  const stimuliTypes = ['shock', 'vibrate', 'beep'];
  const valueOptions = ['low', 'medium', 'high'];
  if (stimuliTypes.indexOf(stimulus) === -1) {return;}

  if (valueOptions.indexOf(value) === -1) {
    value = valueTransform(stimulus, value);
  } 
  if (Number(value) == NaN) {return;}

  var objectCode = 'E48TBzNGlQ'; 
  var getUrl = 'https://pavlok.herokuapp.com/api/' + objectCode + '/' + stimulus + '/' + value;
  var options = '?alert=%20by%20Christian%20Reyes';

  request(getUrl+options, function(repsonse) {
    console.log('getUrl=', getUrl+options);
  })

}

function valueTransform(stimulus, value) {
  // value for vibrate and shock is 0-255
  // value for beep and led is 1-4
  var valueMap = {
    vibrate: {
      low: 85,
      med: 200,
      high: 240
    },
    shock: {
      low: 85,
      med: 150,
      high: 240
    },
    beep: {
      low: 2,
      med: 3,
      high: 4
    }
  };

  return valueMap[stimulus][value];
};

module.exports = {
  stimulate: stimulate
};