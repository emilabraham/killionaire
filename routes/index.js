//Routes
var bodyParser = require('body-parser');
var apicalls = require('../apicalls');

module.exports = function (app) {
  app.get('/', function(request, response) {
    response.render('index');
  });

  app.post('/', bodyParser.urlencoded({extended: true}), function(request, response) {
    var summonerName = request.body.summonerName;
    apicalls.getSummonerId(summonerName, 'na')//Returns the summonerId
    .then(apicalls.getStats.bind(null, 'na'), console.log)//Returns the stats
    .then(apicalls.constructJSON, console.log)//Returns a JSON blob
    .then(function (json) {
      response.render('list', { blob: json, name: summonerName });//Renders with json blob
    }, console.log)
    .catch(function (err) {
      response.render('error', { errorMessage: err });
    });
  });
};
