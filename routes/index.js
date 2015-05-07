//Routes
var bodyParser = require('body-parser');
var apicalls = require('../apicalls');
var router = require('express-promise-router')(); //Creates new instance of router
var p = require('bluebird');


router.get('/', function(request, response) {
  return p.try(function() {
    response.render('index');
  });
});

router.post('/', bodyParser.urlencoded({extended: true}), function(request, response) {
  var summonerName = request.body.summonerName;
  return p.try(function() {
    return apicalls.getSummonerId(summonerName, 'na');//Returns the summonerId
  }).then(function (summonerId) {
    return apicalls.getStats('na', summonerId);//Returns the stats
  }).then(function (stats) {
    return apicalls.constructJSON(stats);//Returns a JSON blob
  }).then(function (json) {
    response.render('list', { blob: json, name: summonerName });//Renders with json blob
  });
});

module.exports = router;
