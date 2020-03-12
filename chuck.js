const https = require('https');

//var getCall = function(request, response) {
  
exports.getCall = function(request, response) {

  https.get("https://api.chucknorris.io/jokes/random" , function(res) {

    res.on("data", function(d) {
      response.json(res.statusCode, JSON.parse(d.toString()));
    });

    res.on("error", function(e) {
      response.json(res.statusCode, JSON.parse(e.toString()));
    });
  });

}
