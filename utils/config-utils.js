require('../bin/nconf-config')();
var nconf = require('nconf');

var ConfigUtils = {
  apikey: nconf.get('API_KEY')
};

module.exports = ConfigUtils;
