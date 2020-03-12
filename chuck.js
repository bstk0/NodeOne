const https = require('https');

//var getCall = function(request, response) {
  
exports.getCall = function(request, response) {

  https.get("https://api.chucknorris.io/jokes/random" , function(res) {

    res.on("data", function(d) {
      //JSON.parse(data).value
      response.json(res.statusCode, JSON.parse(d.toString()));
      //response.json(res.statusCode, JSON.parse(d).value);
    });

    res.on("error", function(e) {
      response.json(res.statusCode, JSON.parse(e.toString()));
    });
  });

}
