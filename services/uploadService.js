import multer from "multer";
//multer nos va permitir como libreria para poder cargar archivos a nuestro servidor
//2 elementos principales--> 1°. el storage, 2°. el uploader
import __dirname from "../utils.js";

const storage = multer.diskStorage({
  //herramienta de almacenamiento que nos permite trabajar en un sistema local de archivos
  //Aqui va el QUÉ, el CÓMO y el DÓNDE se guarda.
  destination: function (req, file, callback) {
    return callback(null, `${__dirname}/public/img`);
  },
  filename: function (req, file, callback) {
    return callback(null, `${Date.now()}-${file.originalname}`);
  },
});

//Ya tengo el almacenamiento, ahora si, el uploader

const uploader = multer({ storage });

export default uploader;