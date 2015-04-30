var options = require('./options');
var p = require('bluebird');
var request = p.promisify(require('request'));

// Generic function that returns an error when a promise is rejected
function reject (message, error) {
  return console.error(message, error);
}

var apicalls = {
  // Get the summonerId from the summonerName
  getSummonerId: function getSummonerId (summonerName, region) {
    console.log("Fetching Summoner Id...");
    function fulfill (response, body) {
      var parsed;
      try{
        parsed = JSON.parse(body);
      }
      catch (error) {
        return console.error('Error parsing JSON: ', error);
      }
      //Workaround because the JSON property is dynamic based on summoner name
      //As in, the summoner name is the key
      for (summoner in parsed) {
        var details = parsed[summoner];
        return details.id;
      }
    }

    return request(options.getSummonerId(summonerName, region))
    .spread(fulfill, reject.bind(null, 'Error retrieving summonerId'));

  },

  // Get the stats as a promise from given summonerId and region
  getStats: function getStats (region, summonerId) {
    console.log("Fetching stats...");
    function fulfill (response, body) {
      var parsed;
      try {
        parsed = JSON.parse(body);
      }
      catch (error){
        return console.error('Error parsing JSON: ', error);
      }
      return parsed;
    }

    return request(options.getStats(summonerId, region))
    .spread(fulfill, reject.bind(null, 'Error retrieving stats'));
  },

  // return the champName as a promise based on champId
  getChampName: function getChampName(region, champId) {
    console.log("Fetching name of Champion...");
    function fulfill (response, body) {
      var parsed;
      try {
        parsed = JSON.parse(body);
      }
      catch (error) {
        return console.error('Error here parsing JSON: ', error);
      }
      var name = parsed.name;
      return name;
    }

    return request(options.getChampNames(champId, region))
    .spread(fulfill, reject.bind(null, 'Error retrieving champName'));

  },

  // Print all of the champ names and pentakills from given stats
  constructJSON: function constructJSON (stats) {
    console.log("Constructing JSON...");
    return p.filter(stats.champions, function(champion) {
      return (champion.id !== 0);
    }).map(function(champion) {
      return p.try(function(){
        return apicalls.getChampName("na", champion.id)
      }).then(function(name){
        return {
          name: name,
          numPenta: champion.stats.totalPentaKills,
          numQuadra: champion.stats.totalQuadraKills,
          numTriple: champion.stats.totalTripleKills,
          numDouble: champion.stats.totalDoubleKills
        }
      });
    }).then(function(champions){
      return champions;
    }).catch(function(err){
      return p.reject(err);
    })
  }
}

module.exports = apicalls;
