

db = connect("mongodb://localhost:27017/routesapp");
db.createCollection("route");
db.route.insertMany([
  {
    _id: ObjectId("667918415768f2189f5f866a"),
    name: "Ruta 3",
    coordinates: [
      {
        _id: "7d111c56-9b88-43a7-a950-d559e0074f71",
        latitude: 4.7049309,
        longitude: -74.1035213,
        address: "Av. Medellín #89a-40, Bogotá, Colombia",
        icon: ""
      },
      {
        _id: "a0686d6c-7d11-46ca-9437-cbb3e4d069a2",
        latitude: 4.7021945,
        longitude: -74.0826898,
        address: "Ac 116 # 72A - 80, Bogotá, Colombia",
        icon: ""
      },
      {
        _id: "7132b7d7-431d-4793-a3e0-5149158305cd",
        latitude: 4.6873546,
        longitude: -74.0839574,
        address: "Cra. 69h #78 a 35, Bogotá, Colombia",
        icon: ""
      }
    ]
  },
  {
    _id: ObjectId("66831cfbf97f997f07661fe8"),
    name: "Ruta 1",
    coordinates: [
      {
        _id: "13b5e3fa-998a-4980-a6fa-7402aaec9a75",
        latitude: 4.7102225,
        longitude: -74.1116844,
        address: "Tv. 100a #80A-20, Engativá, Bogotá, Cundinamarca, Colombia",
        icon: ""
      },
      {
        _id: "235f8b55-23ea-415a-8f14-7e40a90a9b75",
        latitude: 4.7049309,
        longitude: -74.1035213,
        address: "Av. Medellín #89a-40, Bogotá, Colombia",
        icon: ""
      },
      {
        _id: "3b835619-63ea-4113-9705-d3495a9f2ef5",
        latitude: 4.7140972,
        longitude: -74.0983754,
        address: "Cl. 90 # 91 - 52, Bogotá, Colombia",
        icon: ""
      }
    ]
  }
]);

db = connect("mongodb://localhost:27017/reportapp");
db.createCollection("collection_points");
db.collection_points.insertMany([
  {
    _id: ObjectId("6682377eccbec87873fe89fd"),
    location: "Cra. 69h #78 a 35, Bogotá, Colombia",
    details: "No estan clasificando bien los residuos",
    status: "Pendiente",
    email: "ccamilo333@gmail.com"
  },
  {
    _id: ObjectId("66831de892c48b3762617e73"),
    location: "Tv. 100a #80A-20, Engativá, Bogotá, Cundinamarca, Colombia",
    details: "No estan en optimas condiciones",
    status: "Pendiente",
    email: "ccamilo11451@gmail.com"
  }
]);

db = connect("mongodb://localhost:27017/wasteapp");
db.createCollection("waste");
db.waste.insertMany([
  { _id: ObjectId("6680f30b4557ae9d13ab82d4"), typeWaste: "Papel y cartón", classification: "No aprovechables", weight: 13, route: "Ruta B", email: "ccamilo299@gmail.com" },
  { _id: ObjectId("66815b642fb84f64101c467e"), typeWaste: "Cartón y papel", classification: "Aprovechable", weight: 12, route: "Ruta A", email: "empleado@gmail.com" },
  { _id: ObjectId("668314d9d34a06116d55679e"), typeWaste: "Plástico", classification: "Aprovechable", weight: 59, route: "Ruta B", email: "ccamilo222@gmail.com" },
  { _id: ObjectId("668314e5d34a06116d55679f"), typeWaste: "Cartón y papel", classification: "Aprovechable", weight: 23, route: "Ruta A", email: "ccamilo222@gmail.com" },
  { _id: ObjectId("668314efd34a06116d5567a0"), typeWaste: "Vidrio", classification: "Aprovechable", weight: 55, route: "Ruta B", email: "ccamilo222@gmail.com" },
  { _id: ObjectId("668314fbd34a06116d5567a1"), typeWaste: "Metales", classification: "Aprovechable", weight: 76, route: "Ruta B", email: "ccamilo222@gmail.com" },
  { _id: ObjectId("66831509d34a06116d5567a2"), typeWaste: "Textiles", classification: "Aprovechable", weight: 32, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("66831518d34a06116d5567a3"), typeWaste: "Tetrabrik", classification: "Aprovechable", weight: 64, route: "Ruta C", email: "ccamilo222@gmail.com" },
  { _id: ObjectId("66831522d34a06116d5567a4"), typeWaste: "Comida Preparada", classification: "Orgánico aprovechable", weight: 54, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("6683152bd34a06116d5567a5"), typeWaste: "Alimentos", classification: "Orgánico aprovechable", weight: 43, route: "Ruta A", email: "empleado@gmail.com" },
  { _id: ObjectId("66831533d34a06116d5567a6"), typeWaste: "Jardinería", classification: "Orgánico aprovechable", weight: 10, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("6683153bd34a06116d5567a7"), typeWaste: "Poda", classification: "Orgánico aprovechable", weight: 87, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("66831544d34a06116d5567a8"), typeWaste: "Sanitarios", classification: "No aprovechables", weight: 67, route: "Ruta B", email: "ccamilo222@gmail.com" },
  { _id: ObjectId("66831551d34a06116d5567a9"), typeWaste: "Plástico", classification: "No aprovechables", weight: 88, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("6683155ad34a06116d5567aa"), typeWaste: "Papeles y cartones", classification: "No aprovechables", weight: 55, route: "Ruta A", email: "empleado@gmail.com" },
  { _id: ObjectId("66831563d34a06116d5567ab"), typeWaste: "Electrónicos", classification: "No aprovechables", weight: 45, route: "Ruta B", email: "empleado@gmail.com" },
  { _id: ObjectId("6683156cd34a06116d5567ac"), typeWaste: "Vidrio", classification: "No aprovechables", weight: 76, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("66831576d34a06116d5567ad"), typeWaste: "Demolición", classification: "No aprovechables", weight: 34, route: "Ruta A", email: "empleado@gmail.com" },
  { _id: ObjectId("66831580d34a06116d5567ae"), typeWaste: "Químicos", classification: "Peligrosos", weight: 12, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("6683158ad34a06116d5567af"), typeWaste: "Biológicos", classification: "Peligrosos", weight: 52, route: "Ruta B", email: "empleado@gmail.com" },
  { _id: ObjectId("66831593d34a06116d5567b0"), typeWaste: "Tóxicos", classification: "Peligrosos", weight: 23, route: "Ruta A", email: "empleado@gmail.com" },
  { _id: ObjectId("6683159cd34a06116d5567b1"), typeWaste: "Inflamables", classification: "Peligrosos", weight: 56, route: "Ruta B", email: "empleado@gmail.com" },
  { _id: ObjectId("668315a4d34a06116d5567b2"), typeWaste: "Corrosivos", classification: "Peligrosos", weight: 90, route: "Ruta C", email: "empleado@gmail.com" },
  { _id: ObjectId("668315aed34a06116d5567b3"), typeWaste: "Radiactivos", classification: "Peligrosos", weight: 21, route: "Ruta B", email: "empleado@gmail.com" },
]);


// Inicializar base de datos userapp
db = connect("mongodb://localhost:27017/userapp");
db.createCollection("users");
db.users.insertMany([
  {
    _id: ObjectId("668159d1ad05012d2b415807"),
    name: "Administrador",
    email: "administrador@gmail.com",
    city: "Bogota",
    password: "$2a$10$dJ/AQPyPcH.Mo9cJbguaQuhnrjaAsT.BxEXK3SGOISmnwFFpyQc3y",
    rol: "Administrador"
  },
  {
    _id: ObjectId("667ca821bec1654e0fafb737"),
    name: "Empleado",
    email: "empleado@gmail.com",
    city: "Bogota",
    password: "$2a$10$g4Kwq6uS2UEyKCkNHgv9IOOvEPh7dhQTujsExzxsC4BHJzhhWOPZy",
    rol: "Empleado"
  },
  {
    _id: ObjectId("667cbbe6bec1654e0fafb739"),
    name: "Usuario",
    email: "usuario@gmail.com",
    city: "Bogota",
    password: "$2a$10$l7ZnsOcRnsSfuwLkWLdpO.MJN2ydm5pXybtrhcjYL3eCvx/Nviyr6",
    rol: "Usuario"
  }
]);

// Conexión a la base de datos 'userapp'
db = connect("mongodb://localhost:27017/userapp");
db.createCollection("resources");
db.resources.insertMany([
  { _id: ObjectId("665fe810b64bd656a004a905"), code: "Roles", rol: "Usuario" },
  { _id: ObjectId("665fe86cb64bd656a004a906"), code: "Roles", rol: "Empleado" },
  { _id: ObjectId("665fe924b64bd656a004a908"), code: "Roles", rol: "Administrador" },
]);

// Conexión a la base de datos 'wasteapp'
db = connect("mongodb://localhost:27017/wasteapp");
db.createCollection("resources");
db.resources.insertMany([
  { _id: ObjectId("665fe998b64bd656a004a909"), route: "Ruta A", code: "Rutas" },
  { _id: ObjectId("665fe9feb64bd656a004a90a"), code: "Rutas", route: "Ruta B" },
  { _id: ObjectId("665fea98b64bd656a004a90b"), code: "Rutas", route: "Ruta C" },
  { _id: ObjectId("665fef5ab64bd656a004a90f"), code: "Clasificacion", classification: "Aprovechable" },
  { _id: ObjectId("665fefb4b64bd656a004a910"), code: "Clasificacion", classification: "Orgánico aprovechable" },
  { _id: ObjectId("665ff0d7b64bd656a004a911"), classification: "No aprovechables", code: "Clasificacion" },
  { _id: ObjectId("6675fafa20e8f1b71ffcd631"), classification: "Peligrosos", code: "Clasificacion" },
  { _id: ObjectId("665ff387b64bd656a004a915"), type: "Plástico", classification: "Aprovechable", code: "Tipo" },
  { _id: ObjectId("665ff38bb64bd656a004a916"), classification: "Aprovechable", type: "Cartón y papel", code: "Tipo" },
  { _id: ObjectId("665ff38eb64bd656a004a917"), classification: "Aprovechable", type: "Vidrio", code: "Tipo" },
  { _id: ObjectId("665ff394b64bd656a004a918"), classification: "Aprovechable", type: "Metales", code: "Tipo" },
  { _id: ObjectId("665ff397b64bd656a004a919"), classification: "Aprovechable", type: "Textiles", code: "Tipo" },
  { _id: ObjectId("6675dcb520e8f1b71ffcd624"), classification: "Aprovechable", type: "Tetrabrik", code: "Tipo" },
  { _id: ObjectId("665ff561b64bd656a004a91a"), classification: "Orgánico aprovechable", type: "Comida Preparada", code: "Tipo" },
  { _id: ObjectId("665ff566b64bd656a004a91b"), classification: "Orgánico aprovechable", type: "Alimentos", code: "Tipo" },
  { _id: ObjectId("6675df9d20e8f1b71ffcd629"), classification: "Orgánico aprovechable", type: "Jardinería", code: "Tipo" },
  { _id: ObjectId("6675dfb620e8f1b71ffcd62a"), classification: "Orgánico aprovechable", type: "Poda", code: "Tipo" },
  { _id: ObjectId("665ff615b64bd656a004a91c"), classification: "No aprovechables", type: "Sanitarios", code: "Tipo" },
  { _id: ObjectId("665ff619b64bd656a004a91d"), classification: "No aprovechables", type: "Plástico", code: "Tipo" },
  { _id: ObjectId("665ff61cb64bd656a004a91e"), classification: "No aprovechables", type: "Papeles y cartones", code: "Tipo" },
  { _id: ObjectId("665ff61fb64bd656a004a91f"), classification: "No aprovechables", type: "Electrónicos", code: "Tipo" },
  { _id: ObjectId("6675e2e820e8f1b71ffcd62b"), classification: "No aprovechables", type: "Vidrio", code: "Tipo" },
  { _id: ObjectId("6675e33320e8f1b71ffcd62c"), classification: "No aprovechables", type: "Demolición", code: "Tipo" },
  { _id: ObjectId("6675fa2420e8f1b71ffcd62d"), classification: "Peligrosos", type: "Químicos", code: "Tipo" },
  { _id: ObjectId("6675fa7920e8f1b71ffcd62e"), classification: "Peligrosos", type: "Biológicos", code: "Tipo" },
  { _id: ObjectId("6675fadc20e8f1b71ffcd62f"), classification: "Peligrosos", type: "Tóxicos", code: "Tipo" },
  { _id: ObjectId("6675faef20e8f1b71ffcd630"), classification: "Peligrosos", type: "Inflamables", code: "Tipo" },
  { _id: ObjectId("6675fafa20e8f1b71ffcd631"), classification: "Peligrosos", type: "Corrosivos", code: "Tipo" },
  { _id: ObjectId("6675fb1520e8f1b71ffcd632"), classification: "Peligrosos", type: "Radiactivos", code: "Tipo" },
]);
