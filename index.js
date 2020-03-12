const express = require('express');
const router = express.Router();
const nasa = require('./nasa');
const square = require('./square'); 
const chuck = require('./chuck'); 

const app = express();

// GET catalog home page.
//router.get('/nasa', nasa.js);
//app.use('/nasa', nasa);
/*
router.get('/nasa', function(req, res) {
  res.redirect(nasa);
});
*/

app.get('/', (req, res) => {
  res.send('Hello Express app!<br>'
  + 'The area of a square with a width of 4 is ' + square.area(4))
});

app.get('/nasa', (req, res) => {
  res.send(nasa.apiresponse())
});

//URL mapping
app.get('/chuck', chuck.getCall);


app.listen(3000, () => {
  console.log('server started');
});
