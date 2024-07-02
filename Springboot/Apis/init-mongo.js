// init-mongo.js

// Conexión a la base de datos 'userapp'
db = connect("mongodb://localhost:27017/userapp");
db.createCollection("resources");
db.resources.insertMany([
   {
    "_id": ObjectId("665fe810b64bd656a004a905"),
    "code": "Roles",
    "rol": "Usuario"
  },
  {
    "_id": ObjectId("665fe86cb64bd656a004a906"),
    "code": "Roles",
    "rol": "Empleado"
  },
  {
    "_id": ObjectId("665fe924b64bd656a004a908"),
    "code": "Roles",
    "rol": "Administrador"
  }
]);

// Conexión a la base de datos 'wasteapp'
db = connect("mongodb://localhost:27017/wasteapp");
db.createCollection("resources");
db.resources.insertMany([
   {
    "_id": ObjectId("665fe998b64bd656a004a909"),
    "route": "Ruta A",
    "code": "Rutas"
  },
  {
    "_id": ObjectId("665fe9feb64bd656a004a90a"),
    "code": "Rutas",
    "route": "Ruta B"
  },
  {
    "_id": ObjectId("665fea98b64bd656a004a90b"),
    "code": "Rutas",
    "route": "Ruta C"
  },
  {
    "_id": ObjectId("665fef5ab64bd656a004a90f"),
    "code": "Clasificacion",
    "classification": "Aprovechable"
  },
  {
    "_id": ObjectId("665fefb4b64bd656a004a910"),
    "code": "Clasificacion",
    "classification": "Orgánico aprovechable"
  },
  {
    "_id": ObjectId("665ff0d7b64bd656a004a911"),
    "classification": "No aprovechables",
    "code": "Clasificacion"
  },
  {
    "_id": ObjectId("6675fafa20e8f1b71ffcd631"),
    "classification": "Peligrosos",
    "code": "Clasificacion"
  },
  {
    "_id": ObjectId("665ff387b64bd656a004a915"),
    "type": "Plástico",
    "classification": "Aprovechable",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff38bb64bd656a004a916"),
    "classification": "Aprovechable",
    "type": "Cartón y papel",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff38eb64bd656a004a917"),
    "classification": "Aprovechable",
    "type": "Vidrio",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff394b64bd656a004a918"),
    "classification": "Aprovechable",
    "type": "Metales",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff397b64bd656a004a919"),
    "classification": "Aprovechable",
    "type": "Textiles",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675dcb520e8f1b71ffcd624"),
    "classification": "Aprovechable",
    "type": "Tetrabrik",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff561b64bd656a004a91a"),
    "classification": "Orgánico aprovechable",
    "type": "Comida Preparada",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff566b64bd656a004a91b"),
    "classification": "Orgánico aprovechable",
    "type": "Alimentos",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675df9d20e8f1b71ffcd629"),
    "classification": "Orgánico aprovechable",
    "type": "Jardinería",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675dfb620e8f1b71ffcd62a"),
    "classification": "Orgánico aprovechable",
    "type": "Poda",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff615b64bd656a004a91c"),
    "classification": "No aprovechables",
    "type": "Sanitarios",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff619b64bd656a004a91d"),
    "classification": "No aprovechables",
    "type": "Plástico",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff61cb64bd656a004a91e"),
    "classification": "No aprovechables",
    "type": "Papeles y cartones",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff61fb64bd656a004a91f"),
    "classification": "No aprovechables",
    "type": "Electrónicos",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675e2e820e8f1b71ffcd62b"),
    "classification": "No aprovechables",
    "type": "Vidrio",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675e33320e8f1b71ffcd62c"),
    "classification": "No aprovechables",
    "type": "Demolición",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675fa2420e8f1b71ffcd62d"),
    "classification": "Peligrosos",
    "type": "Químicos",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675fa7920e8f1b71ffcd62e"),
    "classification": "Peligrosos",
    "type": "Biológicos",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675fadc20e8f1b71ffcd62f"),
    "classification": "Peligrosos",
    "type": "Tóxicos",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675faef20e8f1b71ffcd630"),
    "classification": "Peligrosos",
    "type": "Inflamables",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675fafa20e8f1b71ffcd631"),
    "classification": "Peligrosos",
    "type": "Corrosivos",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("6675fb1520e8f1b71ffcd632"),
    "classification": "Peligrosos",
    "type": "Radiactivos",
    "code": "Tipo"
  }
]);
