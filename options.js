var configs = require('./utils/config-utils');
var Options = {
  stats: function stats (summonerId, region) {
    return {
      url: 'htt[s://na.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + summonerId + '/ranked',
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  }
}

module.exports = Options;
