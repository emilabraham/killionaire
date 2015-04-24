var options = require('./options');
var p = require('bluebird');
var request = p.promisify(require('request'));

// Generic function that returns an error when a promise is rejected
function reject (message, error) {
  return console.error(message, error);
}

// Get the summonerId from the summonerName
var apicalls = {
  getSummonerId: function getSummonerId (summonerName, region) {
    var deferred = p.defer();
    function fulfill (response, body) {
      var parsed;
      try{
        parsed = JSON.parse(body);
      }
      catch (error) {
        return console.error('Error parsing JSON: ', error);
      }
      //Workaround because the JSON property is dynamic based on summoner name
      for (summoner in parsed) {
        var details = parsed[summoner];
        deferred.resolve(details.id);
      }
    }

    request(options.getSummonerId(summonerName, region))
    .spread(fulfill, reject.bind(null, 'Error retrieving summonerId'));

    return deferred.promise;
  },

  // Get the stats as a promise from given summonerId and region
  getStats: function getStats (region, summonerId) {
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
  },

  // return the champName as a promise based on champId
  getChampName: function getChampName(region, champId) {
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
      deferred.resolve(name);
    }

    request(options.getChampNames(champId, region))
    .spread(fulfill, reject.bind(null, 'Error retrieving champName'));

    return deferred.promise;
  },

  // Print all of the champ names and pentakills from given stats
  constructJSON: function constructJSON (stats) {
    var champions = stats.champions;
    //Size decreased by 1 to compensate for id 0 which is the accumulated stats
    var size = champions.length-1;
    var jsonData = [];
    var deferred = p.defer(); 

    //Print out champName and totalPentaKills this season
    function fulfill (index, name) {
      jsonData.push({
        'name': name,
        'numPenta' : stats.champions[index].stats.totalPentaKills,
        'numQuadra': stats.champions[index].stats.totalQuadraKills,
        'numTriple': stats.champions[index].stats.totalTripleKills,
        'numDouble': stats.champions[index].stats.totalDoubleKills
      });
      if (index === size-1) {
        deferred.resolve(jsonData);
      }
    }

    for (var i = 0; i < size; i++) {
      apicalls.getChampName('na', champions[i].id)
      .then(fulfill.bind(null, i), reject.bind(null, 'Error returning champName'));
    }

    return deferred.promise;
  }
}

module.exports = apicalls;