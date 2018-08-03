var jwt = require('jsonwebtoken');
const User = require('../models/user');
module.exports = token => {
  return jwt.verify(token, 'shhhhh', function(err, decoded) {
    // console.log(decoded.foo);
    if (err) {
      return new Error('invalid credentials');
    }
    return User.findOne({ _id: decoded.foo }, function(err, user) {
      if (err) {
        return new Error('system is down');
      }
      if (!user) {
        return new Error('system is down');
      }

      return user;
    });
  });
};
