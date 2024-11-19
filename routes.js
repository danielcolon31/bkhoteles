// routes.js
const express = require("express");
const router = express.Router();
const { readFile } = require("fs").promises;
const Publicacion = require("./methods/models/publicacionesModels");
const Comentario = require("./methods/models/comentariosModels");
const Hotel = require("./methods/models/hotelesModel");
const moment = require("moment-timezone");

router.get("/publicacionesadd", async (req, res) => {
  try {
    const hotel = new Hotel({
      nombre: "Hotel Tequendama",
      habitaciones: 158,
      ubicacion: "Bogota - Carrera 21",
      resena:
        "Hotel Caribe es un hotel muy bonito y con un ambiente muy agradable",
      disponibles: 20,
      reservas: 100,
    });
    await hotel.save();

    const newPublicacion = {
      hotel: hotel,
      descripcion: "Ubicado frente a la playa de Marbella, en el mar Caribe, este tranquilo hotel se encuentra a 4 km del Castillo San Felipe de Barajas, una fortaleza en lo alto de una colina, y a 1 km del Aeropuerto Internacional Rafael Núñez",
      imagen:
        "https://images.app.goo.gl/UNyMtRVJDdqEKs7w6",
      vistas: 0,
      comentarios: [],
    };
    const publicaciones = await Publicacion(newPublicacion).save();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/publicaciones", async (req, res) => {
  try {
    const publicaciones = await Publicacion.find().populate("hotel");
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/publicaciones/:id", async (req, res) => {
  try {
    const publicacion = await Publicacion.find({ _id: req.params.id }).populate(
      "hotel",
    );
    publicacion[0].vistas++;
    const publicacionActualizada = new Publicacion(publicacion[0]);
    await publicacionActualizada.save();
    res.status(200).json(publicacionActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/publicaciones/:id/comentario/:idc/like", async (req, res) => {
  const usuario = req.body.usuario;

  try {
    const publicacion = await Publicacion.findById(req.params.id);
    const comentario = publicacion.comentarios.find(
      (c) => c._id == req.params.idc,
    );

    if (comentario) {
      const likeIndex = comentario.likes.findIndex(
        (l) => l.usuario == usuario.usuario,
      );

      if (likeIndex !== -1) {
        // El usuario ya ha dado like o dislike al comentario
        if (
          comentario.likes[likeIndex].like === usuario.like &&
          comentario.likes[likeIndex].dislike === usuario.dislike
        ) {
          // El usuario está dando like o dislike nuevamente, por lo que eliminamos el like/dislike
          comentario.likes.splice(likeIndex, 1);
          console.log("Like o dislike eliminado");
        } else {
          // El usuario está cambiando de like a dislike o viceversa
          comentario.likes[likeIndex].like = usuario.like;
          comentario.likes[likeIndex].dislike = usuario.dislike;
          console.log("Cambiando de like a dislike o viceversa");
        }
      } else {
        // El usuario no ha dado like o dislike antes, así que agregamos el nuevo like/dislike
        comentario.likes.push({
          usuario: usuario.usuario,
          like: usuario.like,
          dislike: usuario.dislike,
        });
        console.log("Like o dislike agregado");
      }

      await publicacion.save();
      res.status(200).json(publicacion);
    } else {
      res
        .status(404)
        .json({ message: "Comentario no encontrado en la publicación" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/publicaciones/:id/comentarios", async (req, res) => {
  const comentarioData = req.body;
  try {
    const fechaActualColombia = moment().tz("America/Bogota");
    const publicacion = await Publicacion.findById(req.params.id);
    const comentario = new Comentario({
      nombre: comentarioData.nombre,
      comentario: comentarioData.comentario,
      fecha: fechaActualColombia.format("DD/MM/YYYY HH:mm:ss"),
      likes: [],
    });
    await comentario.save();
    publicacion.comentarios.push(comentario);
    await publicacion.save();
    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
