var express = require('express');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

//Routes
app.use('/', require('./routes/index'));

app.set('view options', { pretty: true });
app.locals.pretty = true;
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/tablesorter', express.static(__dirname + '/node_modules/tablesorter/dist/js'));

//General error handling middleware
app.use(function (error, request, response, next) {
  console.log(error);
  response.status(404).render('error', { err: error });
});

var server = app.listen(3000, function() {
  console.log('Started server on port 3000');
});
