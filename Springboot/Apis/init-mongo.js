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
    "_id": ObjectId("665ff387b64bd656a004a915"),
    "type": "Plástico",
    "classification": "Aprovechable",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff38bb64bd656a004a916"),
    "classification": "Aprovechable",
    "type": "Cartón",
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
    "type": "Papel",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff397b64bd656a004a919"),
    "classification": "Aprovechable",
    "type": "Metal",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff561b64bd656a004a91a"),
    "classification": "Orgánico aprovechable",
    "type": "Restos de comida",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff566b64bd656a004a91b"),
    "classification": "Orgánico aprovechable",
    "type": "Desechos agrícolas",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff615b64bd656a004a91c"),
    "classification": "No aprovechables",
    "type": "Papel higiénico",
    "code": "Tipo"
  },
  {
    "_id": ObjectId("665ff619b64bd656a004a91d"),
    "classification": "No aprovechables",
    "type": "Servilletas",
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
    "type": "Papel metalizado",
    "code": "Tipo"
  }
]);
