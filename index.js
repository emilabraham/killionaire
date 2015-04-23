var options = require('./options');
var p = require('bluebird');
var request = p.promisify(require('request'));

// Generic function that returns an error when a promise is rejected
function reject (message, error) {
  return console.error(message, error);
}

// Get the summonerId from the summonerName
function getSummonerId (summonerName, region) {
  var deferred = p.defer();
  function fulfill (response, body) {
    var parsed;
    try{
      parsed = JSON.parse(body);
    }
    catch (error) {
      return console.error('Error parsing JSON: ', error);
    }
    deferred.resolve(parsed.id);
  }

  request(options.getSummonerId(summonerName, region))
  .spread(fulfill, reject.bind(null, 'Error retrieving summonerId'));

  return deferred.promise;
}

// Get the stats as a promise from given summonerId and region
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

// return the champName as a promise based on champId
function getChampName(champId, region) {
  var deferred = p.defer();
  function fulfill (response, body) {
    var parsed;
    try {
      parsed = JSON.parse(body);
    }
    catch (error) {
      return console.error('Error here parsing JSON: ', error);
    }
    var name = parsed.name;
    //console.log(parsed);
    deferred.resolve(name);
  }

  request(options.getChampNames(champId, region))
  .spread(fulfill, reject.bind(null, 'Error retrieving champName'));

  return deferred.promise;
}

// Print all of the champ names and pentakills from given stats
function printStats (stats) {
  var champions = stats.champions;
  //Size decreased by 1 to compensate for id 0 which is the accumulated stats
  var size = champions.length-1;

  //Print out champName and totalPentaKills this season
  function fulfill (index, name) {
    console.log(stats.summonerId + '/' + name + ': ' + stats.champions[index].stats.totalPentaKills);
  }

  for (var i = 0; i < size; i++) {
    getChampName(champions[i].id, 'na')
    .then(fulfill.bind(null, i), reject.bind(null, 'Error returning champName'));
  }
}

// main
// Print Doublelift's stats
getStats(20132258, 'na')
.then(printStats);
