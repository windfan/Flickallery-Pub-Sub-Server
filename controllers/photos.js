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
    response.json(200, { error: null });
  });
  //response.send(200, "Success");
  next();
};

module.exports.get = function(){
  photos.get(function(error, data){
    response.json(error ? 503 : 200, {
      error: error ? 503 : null,
      errorMessage: error ? error : null,
      data: data
    })
  });
};
