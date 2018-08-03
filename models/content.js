const mongoose = require('mongoose');
const songSchema = require('./song');
const { Schema } = mongoose;

const contentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  songs: [songSchema]
});
const ModelClass = mongoose.model('contents', contentSchema);

//Export the model
module.exports = ModelClass;
