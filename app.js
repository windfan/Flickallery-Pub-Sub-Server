'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
app.get('/', function(request, response){
  response.send('OK\n');
});


app.listen(port, function(){
  console.log('Listening on port 3001');
});
