//Routes
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/', function(request, response) {
    response.render('index', { title: 'Hey', message: 'Hello there!' });
  });
  app.get('/about', function (request, response) {
    response.render('about.html');
  });
  app.post('/', bodyParser.urlencoded({extended: true}), function(request, response) {
    console.log(request.body.summonerName);
    response.render('list', { summonerName: request.body.summonerName });
  });
};
