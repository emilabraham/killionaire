var express = require('express');
var app = express();
require('./routes/index.js')(app);
app.set('views', './views');
app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.locals.pretty = true;
app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
var server = app.listen(3000, function() {
  console.log('Started server on port 3000');
});
