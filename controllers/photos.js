'use strict';

var photos = require('./../models/photos');
var _ = require('underscore');

/* Send photos to models to be saved*/
module.exports.save = function(request, response, next){
  var photoList = _.clone(request.body);
  photos.save(photoList, function(error){
    if(error) return response.json(503, {error: true} );
    next();
  });
};

/* Trim down the redis list */
module.exports.trim = function(request, response, next){
  photos.trim()
  next();
};

/* Send photos to to pub/sub socket in models */
module.exports.send = function(request, response, next){
  var photoList = _.clone(request.body);
  photos.send(photoList, function(error){
    if(error) return response.json(503, {error: true} );
    response.status(200).json({ error: null });
  });
  //response.send(200, "Success");
  next();
};
/* Get 10 photos from model */
module.exports.get = function(request, response){
  photos.get(function(error, data){
    response.status(error ? 503 : 200).json({
      error: error ? 503 : null,
      errorMessage: error ? error : null,
      data: data
    })
  });
};
