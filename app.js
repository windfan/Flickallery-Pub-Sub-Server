'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var photos = require('./controllers/photos');

/* Parse the incoming data from Flickr to be json format */
app.use(express.json());

/* Receive the data from Flickr and save in Redis, then send to socket */
app.post('/', photos.save, photos.send, function(req, res){
  res.send('\nSend!\n\n');
});

app.get('/', photos.get);


app.listen(port, function(){
  console.log('Listening on port 3001');
});
