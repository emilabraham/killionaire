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

// Print the champName based on champId
function getChampName(champId, region) {
  //var deferred = p.defer();
  function fulfill (response, body) {
    var parsed;
    try {
      parsed = JSON.parse(body);
    }
    catch (error) {
      return console.error('Error here parsing JSON: ', error);
    }
    var name = parsed.name;
    console.log(name);
  }

  request(options.getChampNames(champId, region))
  .spread(fulfill, reject.bind(null, 'Error retrieving champName'));
}

// Print all of the champ names from given stats
function printNames (stats) {
  var champions = stats.champions;
  //Size decreased by 1 to compensate for id 0 which is the accumulated stats
  var size = champions.length-1;
  function fulfill (name) {
    return name;
  }
  for (var i = 0; i < size; i++) {
    getChampName(champions[i].id, 'na');
  }
}

// main
getStats(25523944, 'na')
.then(printNames);
//getChampNames(1, 'na');
