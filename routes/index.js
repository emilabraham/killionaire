module.exports = function(app) {
  app.get('/', function(request, response) {
    response.render('index', { title: 'Hey', message: 'Hello there!' });
  });
  app.get('/about', function (request, response) {
    response.render('about.html');
  });
};
