var options = require('./options');
var p = require('bluebird');
var request = p.promisify(require('request'));

// Generic function that returns an error when a promise is rejected
function reject (message, error) {
  return console.error(message, error);
}

// Get the stats from given summonerId and region
function getStats (summonerId, region) {
  var deferred = p.defer();
  function fulfill (response, body) {
    var parsed;
    try {
      parsed = JSON.parse(body);
    }
    catch (error){
      return console.error('Error parsing JSON: ', error);
    }
    deferred.resolve(parsed);
  }

  request(options.getStats(summonerId, region))
  .spread(fulfill, reject.bind(null, 'Error retrieving stats'));

  return deferred.promise;
}

function getChampNames(champId, region) {
  var deferred = p.defer();
  function fulfill (response, body) {
    var parsed;
    try {
      parsed = JSON.parse(body);
    }
    catch (error) {
      return console.error('Error parsing JSON: ', error);
    }
    deferred.resolve(parsed);
  }

  request(options.getChampNames(champId, region))
  .spread(fulfill, reject.bind(null, 'Error retrieving champName'));

  return deferred.promise;
}

// main
getStats(25523944, 'na')
.then(console.log);
//getChampNames(1, 'na');
