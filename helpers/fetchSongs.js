const Content = require('../models/content');
var jwt = require('jsonwebtoken');
module.exports = token => {
  return jwt.verify(token, 'shhhhh', function(err, decoded) {
    if (err) {
      return new Error('wrong token');
    }

    return Content.findOne({ user_id: decoded.foo }, (err, user) => {
      if (err) {
        return new Error('server error');
      }
    });
  });
};
