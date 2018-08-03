const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  songName: String,
  likes: { type: Number, default: 0 }
});

//Export the model
module.exports = songSchema;
