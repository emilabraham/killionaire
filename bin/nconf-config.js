var nconf = require('nconf');

module.exports = function() {
  nconf.argv().env();
  nconf.file({ file: './config.json' });

  nconf.defaults({
    API_KEY: 'RGAPI-539a258f-8922-41b2-8aad-d4786a252381'
  });
  return nconf;
};
