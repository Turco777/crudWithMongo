import videogameModel from "../models/videogame.js";

export default class videogamesManager {
  getVideogames = (params) => {
    return videogameModel.find(params).lean(); // .lean hace que devuelva un objeto de js plano, sin virtualizaciones, sin variables internas, sin instancias de documentos
  };
  getVideogameBy = (params) => {
    return videogameModel.findOne(params).lean();
  };
  createVideogame = (videogame) => {
    return videogameModel.create(videogame);
  };
  updateVideogame = (id, videogame) => {
    return videogameModel.updateOne({ _id: id }, { $set: videogame });
  };
  deleteVideogame = (id) => {
    return videogameModel.deleteOne({ _id: id });
  };
}
