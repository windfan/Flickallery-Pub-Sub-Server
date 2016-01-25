'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var photos = require('./controllers/photos');
var bodyParser = require('body-parser');
/* Parse the incoming data from Flickr to be json format */
app.use(bodyParser.json());

/* Receive the data from Flickr and save in Redis, then send to socket */
app.post('/', photos.save, photos.trim, photos.send);

app.get('/photos', photos.get);


app.listen(port, function(){
  console.log('Listening on port %d', port);
});
