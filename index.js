var options = require('./options');
var p = require('bluebird');
var request = p.promisify(require('request'));

request(options.stats(25523944, 'na'))
.spread(function (response, body) {
  var parsed;
  try {
    parsed = JSON.parse(body);
  }
  catch (error){
    return console.error('Error parsing JSON: ', error);
  }
  console.log(parsed);
},
function (error) {
  return console.error('Request threw an error: ', error);
});
