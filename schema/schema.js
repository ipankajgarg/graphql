const graphql = require('graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = graphql;
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const userAuthentication = require('../helpers/userAuthentication');
const validateToken = require('../helpers/validateToken');
const fetchSongs = require('../helpers/fetchSongs');
const createSong = require('../helpers/createSong');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});
const SongType = new GraphQLObjectType({
  name: 'song',
  fields: {
    id: { type: GraphQLString },
    songName: { type: GraphQLString },
    likes: { type: GraphQLInt }
  }
});

const ContentType = new GraphQLObjectType({
  name: 'content',
  fields: {
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    songs: { type: new GraphQLList(SongType) }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    demo: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) {
        // console.log('req', req.headers.authorization);
        console.log('new token');
        var token = jwt.sign({ foo: args.id }, 'shhhhh');
        return {
          token
        };
      }
    },
    token: {
      type: UserType,

      resolve(parentValue, args, req) {
        return validateToken(req.headers.authorization);
      }
    },
    content: {
      type: ContentType,
      resolve(parentValue, args, req) {
        console.log(req.headers.authorization);
        return fetchSongs(req.headers.authorization);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    userRegister: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return new User({
          email: args.email,
          username: args.username,
          password: args.password
        }).save();
      }
    },
    userLogin: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },

        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        console.log('request');
        return userAuthentication(args.email, args.password);
      }
    },
    song: {
      type: ContentType,
      args: {
        songName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { songName }, req) {
        console.log(req.headers.authorization);

        return createSong(req.headers.authorization, songName);
      }
    }
  }
});

//
// email: { type: new GraphQLNonNull(GraphQLString) },
// username: { type: new GraphQLNonNull(GraphQLString) },
// password: { type: new GraphQLNonNull(GraphQLString) }
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
