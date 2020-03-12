const https = require('https');
const htmlparser = require('htmlparser2');


var processResponse = function(result) {
    var data = "";
    result.on("data", function(chunk) {
        data += chunk;
    });
    var tags = [];
    var tagsCount = {};
    var tagsWithCount = [];
    result.on("end", function(chunk) {
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs) {
                if(tags.indexOf(name) === -1) {
                    tags.push(name);
                    tagsCount[name] = 1;
                } else {
                    tagsCount[name]++;
                }
            },
            onend: function() {
                for(var i = 0; i < tags.length; i++) {
                    tagsWithCount.push({name: tags[i], count: tagsCount[tags[i]]});
                }
            }
        }, {decodeEntities: true});
        parser.write(data);
        parser.end();
        //res.send({website: req.query.url, port: options.port, data: data, tags: tagsWithCount});
        //result.send({website: req.query.url, port: options.port, data: data, tags: tagsWithCount});
        //result.send({data: data});
        return data;
    });
}


exports.apiresponse = function(event, context) {

  console.log("nasa.js...");

// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
https.get('https://api.chucknorris.io/jokes/random', (resp) => {
  processResponse(resp);
  
  //let data = '';

  // A chunk of data has been recieved.
  //resp.on('data', (chunk) => {
  //  data += chunk;
  //});

  // The whole response has been received. Print out the result.
  /*
  resp.on('end', () => {
    //console.log(JSON.parse(data).explanation);
    //console.log(JSON.parse(data).value);
    resp.write(JSON.parse(data).value);
  });
  */
  //context.succeed(data);

resp.on('end', () => {
  context.succeed(data);
});

}).on("error", (err) => {
  console.log("Error: " + err.message);
})
}