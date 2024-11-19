const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  habitaciones: {
    type: Number,
    required: true,
  },
  ubicacion: {
    type: String,
  },
  resena: {
    type: String,
    required: true,
  },
  disponibles: {
    type: Number,
    required: true,
  },
  reservas: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Hoteles', hotelSchema)