const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    required: true
  },
  dislike: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Like', likeSchema)