const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const createToken = require('./createToken');

module.exports = (email, password, callback) => {
  return User.findOne({ email: email })
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return createToken(user);
      }
      return new Error('invalid credentials');
    })
    .catch(err => {
      console.log('this is error');
      return new Error('invalid email or password');
    });
};
