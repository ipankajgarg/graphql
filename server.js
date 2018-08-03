const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

const MONGO_URI =
  'mongodb://ipankaj:ipankaj@ds123399.mlab.com:23399/authgraphql';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true,
    schema
  })
);

app.listen('4000', () => {
  console.log('listening');
});
