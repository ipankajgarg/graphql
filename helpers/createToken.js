var jwt = require('jsonwebtoken');
module.exports = user => {
  var token = jwt.sign({ foo: user.id }, 'shhhhh');
  return { token };
};
