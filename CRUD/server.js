const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Configurar la conexión a la base de datos
const dbConfig = {
  host: "nodemysql12.mysql.database.azure.com",
  user: "mastero",
  password: "Alejandrof15",
  database: "denuncias",
  port: 3306, // El puerto por defecto de MySQL es 3306
  ssl: true
};

const connection = mysql.createConnection(dbConfig);

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa con la base de datos.');
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para obtener todas las víctimas
app.get("/victimas", (req, res) => {
  connection.query("SELECT * FROM victimas", (error, results) => {
    if (error) {
      console.error("Error al obtener las víctimas", error);
      res.status(500).json({ error: "Error al obtener las víctimas" });
    } else {
      res.json(results);
    }
  });
});

app.get("/domicilios", (req, res) => {
  connection.query("SELECT * FROM domicilio", (error, results) => {
    if (error) {
      console.error("Error al obtener las víctimas", error);
      res.status(500).json({ error: "Error al obtener las víctimas" });
    } else {
      res.json(results);
    }
  });
});

app.get("/informes", (req, res) => {
  connection.query("SELECT * FROM informe", (error, results) => {
    if (error) {
      console.error("Error al obtener las víctimas", error);
      res.status(500).json({ error: "Error al obtener las víctimas" });
    } else {
      res.json(results);
    }
  });
});

app.get("/seguimiento", (req, res) => {
  connection.query("SELECT * FROM seguimiento", (error, results) => {
    if (error) {
      console.error("Error al obtener las víctimas", error);
      res.status(500).json({ error: "Error al obtener las víctimas" });
    } else {
      res.json(results);
    }
  });
});

app.get("/folio", (req, res) => {
  const query = "SELECT MAX(folio) AS max_folio FROM victimas";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener el último folio", error);
      res.status(500).json({ error: "Error al obtener el último folio" });
    } else {
      const maxFolio = results[0].max_folio;
      res.json({ maxFolio });
    }
  });
});

// Ruta para obtener estado del folio
app.get("/estado/:folio", (req, res) => {
  const folio = req.params.folio;
  const query = "SELECT * FROM seguimiento WHERE folio = ?";
  const values = [folio];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error al obtener valores por folio", error);
      res.status(500).json({ error: "Error al obtener valores por folio" });
    } else {
      if (results.length > 0) {
        const valores = results[0];
        res.json(valores);
      } else {
        res.json(null);
      }
    }
  });
});

// Ruta para crear una nueva víctima
app.post('/victimas', (req, res) => {
  const { id_denunciante, folio, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, genero, escolaridad, correo_electronico, estado, municipio, colonia, codigo_postal, calle, no_exterior, no_interior, tel_celular, tel_fijo, es_victima } = req.body;
  const query = `INSERT INTO victimas (id_denunciante, folio, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, genero, escolaridad, correo_electronico, estado, municipio, colonia, codigo_postal, calle, no_exterior, no_interior, tel_celular, tel_fijo, es_victima)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [id_denunciante, folio, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, genero, escolaridad, correo_electronico, estado, municipio, colonia, codigo_postal, calle, no_exterior, no_interior, tel_celular, tel_fijo, es_victima];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear la víctima', error);
      res.status(500).json({ error: 'Error al crear la víctima' });
    } else {
      res.json({ insertId: result.insertId });
    }
  });
});

// Ruta para crear un nuevo domicilio
app.post('/domicilios', (req, res) => {
  const { folio, fecha_hecho, hora_hecho, estado_hecho, municipio_hecho, colonia_hecho, codigo_postal_hecho, calle_hecho, no_exterior_hecho, no_interior_hecho } = req.body;
  const query = `INSERT INTO domicilio (folio, fecha_hecho, hora_hecho, estado_hecho, municipio_hecho, colonia_hecho, codigo_postal_hecho, calle_hecho, no_exterior_hecho, no_interior_hecho)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [folio, fecha_hecho, hora_hecho, estado_hecho, municipio_hecho, colonia_hecho, codigo_postal_hecho, calle_hecho, no_exterior_hecho, no_interior_hecho];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el domicilio', error);
      res.status(500).json({ error: 'Error al crear el domicilio' });
    } else {
      res.json({ insertId: result.insertId });
    }
  });
});

// Ruta para crear un nuevo informe
app.post('/informes', (req, res) => {
  const {
    folio,
    nombre_probable_responsable,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    genero,
    alias,
    estado_domicilio,
    municipio_domicilio,
    colonia_domicilio,
    calle_domicilio,
    no_exterior_domicilio,
    no_interior_domicilio,
    color_piel,
    color_ojos,
    tipo_cabello,
    color_cabello,
    complexion,
    tatuajes,
    estatura,
    tipo_delito,
    sufrio_danio,
    hubo_testigos,
    llamo_emergencia,
    detalles_hechos,
    unidad_investigacion
  } = req.body;

  const query = `INSERT INTO informe 
                 (folio, nombre_probable_responsable, apellido_paterno, apellido_materno, fecha_nacimiento, genero, alias, estado_domicilio, municipio_domicilio, colonia_domicilio, calle_domicilio, no_exterior_domicilio, no_interior_domicilio, color_piel, color_ojos, tipo_cabello, color_cabello, complexion, tatuajes, estatura, tipo_delito, sufrio_danio, hubo_testigos, llamo_emergencia, detalles_hechos, unidad_investigacion)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    folio,
    nombre_probable_responsable,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    genero,
    alias,
    estado_domicilio,
    municipio_domicilio,
    colonia_domicilio,
    calle_domicilio,
    no_exterior_domicilio,
    no_interior_domicilio,
    color_piel,
    color_ojos,
    tipo_cabello,
    color_cabello,
    complexion,
    tatuajes,
    estatura,
    tipo_delito,
    sufrio_danio,
    hubo_testigos,
    llamo_emergencia,
    detalles_hechos,
    unidad_investigacion
  ];

  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el informe:', error);
      res.status(500).json({ error: 'Error al crear el informe' });
    } else {
      res.json({ insertId: result.insertId });
    }
  });
});

// Ruta para crear un nuevo seguimiento
app.post('/seguimiento', (req, res) => {
  const { folio, estado, seguimiento } = req.body;
  const query = `INSERT INTO seguimiento (folio, estado, seguimiento)
                 VALUES (?, ?, ? )`;
  const values = [folio, estado, seguimiento ];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear seguimiento', error);
      res.status(500).json({ error: 'Error al crear seguimiento' });
    } else {
      res.json({ insertId: result.insertId });
    }
  });
});

// Opciones de configuración del servidor HTTPS
const httpsOptions = {
  cert: fs.readFileSync("cert.pem"),
  key: fs.readFileSync("cert.key")
};

// Crear el servidor HTTPS
const server = https.createServer(httpsOptions, app);

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log("Servidor backend iniciado en el puerto 3000 (HTTPS)");
});
