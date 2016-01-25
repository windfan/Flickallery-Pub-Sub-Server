'use strict';

var redis = require('./../lib/redis');
var broadcast = require('./../lib/broadcast');
/* Save data to database */
/*  @param {Array} photoList
 *  @param {Function} callback
 */
module.exports.save = function(photoList, callback) {
  if(!photoList.length) return callback(null, null);
  var photo = photoList.pop();
  redis.lpush('photos', JSON.stringify(photo), function(error){
    if(error) return callback(error, null);
    module.exports.save(photoList, callback);
  });
};

module.exports.trim = function() {
  redis.ltrim('photos', 0, 9, function(error){
    if(error) throw error;
  });
};

/* Send photos to broadcaster */
/*  @param {Array} photoList
 *  @param {Function} callback
 */
module.exports.send = function(photoList, callback){
  photoList.forEach(broadcast.send);
  callback(null, null);
};
