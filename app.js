var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.locals.pretty = true;
app.use('/', require('./routes/index'));
app.use(express.static('public'));

//General error handling middleware
app.use(function (error, request, response, next) {
  response.status(404).render('error', { err: error });
});
var server = app.listen(3000, function() {
  console.log('Started server on port 3000');
});
