//dao = Data Access Object
// multer --> en utils.js o en una carpeta service como uploadService.js

import express from "express";
import mongoose from "mongoose";
import viewsRouter from "./routes/views.router.js";
import videogamesRouter from "./routes/videogames.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const connection = mongoose.connect(
  "mongodb+srv://turco123:password123!@cluster0.emmu6m2.mongodb.net/coderGaming?retryWrites=true&w=majority"
);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter);
app.use("/api/videogames", videogamesRouter);
