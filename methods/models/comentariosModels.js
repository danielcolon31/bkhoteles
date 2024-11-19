const mongoose = require('mongoose')
const Like = require('./likes')
const comentarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  likes: [Like.schema]
})

module.exports = mongoose.model('Comentarios', comentarioSchema)