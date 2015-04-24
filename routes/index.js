//Routes
var bodyParser = require('body-parser');
var eatShit = require('../index');

module.exports = function (app) {
  app.get('/', function(request, response) {
    response.render('index', { title: 'Hey', message: 'Hello there!' });
  });

  app.get('/about', function (request, response) {
    response.render('about.html');
  });

  app.post('/', bodyParser.urlencoded({extended: true}), function(request, response) {
    var summonerName = request.body.summonerName;
    console.log(summonerName);
    eatShit.getSummonerId(summonerName, 'na')
    .then(eatShit.getStats.bind(null, 'na'), console.log)
    .then(eatShit.constructJSON, console.log)
    .then(response.render.bind(null, 'list'), console.log);
    //response.render('list', { summonerName: request.body.summonerName });
  });
};
