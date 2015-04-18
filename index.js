var options = require('./options');
var p = require('bluebird');
var request = p.promisify(require('request'));

// Generic function that returns an error when a promise is rejected
function reject (message, error) {
  return console.error(message, error);
}

// Get the stats from given summonerId and region
function getStats (summonerId, region) {
  function fulfill (response, body) {
    var parsed;
    try {
      parsed = JSON.parse(body);
    }
    catch (error){
      return console.error('Error parsing JSON: ', error);
    }
    console.log(parsed);
  }

  request(options.getStats(summonerId, region))
  .spread(fulfill, reject.bind(null, 'Error retrieving stats'));
}

// main
getStats(25523944, 'na');
