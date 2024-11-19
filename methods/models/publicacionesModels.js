const mongoose = require('mongoose');
const comentarioModel = require('./comentariosModels');

const publicacionSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hoteles',
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  vistas: {
    type: Number,
    required: true,
  },
  comentarios: [comentarioModel.schema], 
});

module.exports = mongoose.model('Publicaciones', publicacionSchema)