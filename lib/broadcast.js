'use strict';

var axon = require('axon');
var socket = axon.socket('pub');

socket.bind(8001);

/* Detect error */
socket.on('error', function(error){
  throw error;
});

/* Send a photo to the publish socket */
module.exports.send = function(photo) {
  socket.send(photo);
};
