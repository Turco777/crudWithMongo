import { Router } from "express";
import videogamesManager from "../dao/mongo/managers/videogamesManager.js";

const router = Router();
const videogamesService = new videogamesManager();

router.get("/", async (req, res) => {
  const videogames = await videogamesService.getVideogames();
  console.log(videogames);
  res.render("Home", {
    videogames,
  });
});

export default router;
