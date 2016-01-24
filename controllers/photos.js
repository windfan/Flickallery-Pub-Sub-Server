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

/* */
module.exports.trim = function(){

};

/* Send photos to to pub/sub socket in models */
module.exports.send = function(){

};

module.exports.get = function(){

};
