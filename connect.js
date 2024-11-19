const mongoose = require('mongoose');

// Cadena de conexión a MongoDB
const uri = "mongodb+srv://dani75395124862:75395124862@hoteles.fvk8u.mongodb.net/?retryWrites=true&w=majority&appName=hoteles";

// Opciones recomendadas para evitar advertencias
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Conexión a la base de datos
mongoose.connect(uri, options)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch(err => {
    console.error("Error al conectar a MongoDB", err);
  });

module.exports = mongoose;

