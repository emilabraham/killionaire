var configs = require('./utils/config-utils');

//Options for the requests

var Options = {
  getStats: function getStats (summonerId, region) {
    return {
      url: 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + summonerId + '/ranked',
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  },

  getChampNames: function getChampNames (champId, region) {
    return {
      url: 'https://global.api.pvp.net/api/lol/static-data/' + region + '/v1.2/champion/' + champId,
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  },

  getSummonerId: function getSummonerId (summonerName, region) {
    return {
      url: 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName,
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  },

  getDragonVersion: function getDragonVersion (region) {
    return {
      url: 'https://global.api.pvp.net/api/lol/static-data/' + region + '/v1.2/realm/',
      method: 'GET',
      qs: {
        api_key: configs.apikey
      }
    }
  },

  getImageName: function getImageName (champId, region) {
    return {
      url: 'https://global.api.pvp.net/api/lol/static-data/' + region + '/v1.2/champion/' + champId,
      method: 'GET',
      qs: {
        api_key: configs.apikey,
        champData: 'image'
      }
    }
  }
}

module.exports = Options;
