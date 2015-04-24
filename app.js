var express = require('express');
var app = express();
require('./routes/index.js')(app);
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
var server = app.listen(3000, function() {
  console.log('Started server on port 3000');
});
