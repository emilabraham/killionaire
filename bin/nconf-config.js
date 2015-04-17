var nconf = require('nconf');

module.exports = function() {
  nconf.argv().env();
  nconf.file({ file: './config.json' });

  nconf.defaults({
    API_KEY: 'fce87c83-d6f4-4e5f-98ab-da74bb6448ba'
  });
  return nconf;
};
