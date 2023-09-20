import { Router } from "express";
import videogamesManager from "../dao/mongo/managers/videogamesManager.js";
import uploader from "../services/uploadService.js";

const router = Router();
const videogamesService = new videogamesManager();

router.get("/", async (req, res) => {
  const videogames = await videogamesService.getVideogames();
  console.log(videogames);
  res.send({ status: "Success", payload: videogames });
});

router.post("/", uploader.array("images"), async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  const { title, description, price, categories } = req.body;
  //Las imagenes van a vivir en req.files, el resto de datos en req.body
  if (!title || !description || !price)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });

  //Construyo el objeto videojuego:
  const newVideogame = {
    title,
    description,
    price,
    categories,
  };
  const images = req.files.map(
    (file) =>
      `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/img/${
        file.filename
      }`
    // esto esta convirtiendo la imagen en una url de acceso
  );
  newVideogame.images = images;
  //Ya creé el objeto, ya mapeé las imagenes, ahora sí, inserto en la base
  const result = await videogamesService.createVideogame(newVideogame);
  res.send({ status: "success", payload: result._id });
});

router.put("/:vid", async (req, res) => {
  const { vid } = req.params;
  const { title, description, price, categories } = req.body;

  //Construir el objeto de actualizacion
  const updateVideogame = {
    title,
    description,
    price,
    categories,
  };
  //el videogame existe?
  const videogame = await videogamesService.getVideogameBy({ _id: vid });
  if (!videogame)
    return res
      .status(400)
      .send({ status: "error", error: "Videogame doesn't exist" });
  await videogamesService.updateVideogame(vid, updateVideogame);
  res.send({ status: "success", message: "Videogame updated" });
});

router.delete("/:vid", async (req, res) => {
  const { vid } = req.params;
  const result = await videogamesService.deleteVideogame(vid);
  console.log(result);
  res.send({ status: "success", message: "Videogame deleted" });
});

export default router;
