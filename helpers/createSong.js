const Content = require('../models/content');
const fetchSongs = require('./fetchSongs');
var jwt = require('jsonwebtoken');

module.exports = (token, songName) => {
  return jwt.verify(token, 'shhhhh', function(err, decoded) {
    if (err) {
      return new Error('invalid token');
    }
    console.log(decoded.foo);

    return Content.findOneAndUpdate(
      { user_id: decoded.foo },
      { $push: { songs: { songName } } },
      { new: true, upsert: true }
    )
      .then(data => {
        return data;
      })
      .catch(err => new Error('server error'));
  });
};
