var express = require('express');
var app = express();
require('./routes')(app);
app.set('views', './views');
app.set('view engine', 'jade');
var server = app.listen(3000, function() {
  console.log('Started server on port 3000');
});
