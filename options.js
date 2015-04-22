var configs = require('./utils/config-utils');
var Options = {
  getStats: function getStats (summonerId, region) {
    return {
      url: 'https://na.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + summonerId + '/ranked',
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  },

  getChampNames: function getChampNames (champId, region) {
    return {
      url: 'https://na.api.pvp.net/api/lol/static-data/' + region + '/v1.2/champion/' + champId,
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  }
}

module.exports = Options;
