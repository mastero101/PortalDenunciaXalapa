const express = require("express");
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
  const { folio, identifica_caracteristicas, nombre_probable_responsable, apellido_paterno, apellido_materno, fecha_nacimiento, genero, alias, estado_domicilio, municipio_domicilio, colonia_domicilio, calle_domicilio, no_exterior_domicilio, no_interior_domicilio, color_piel, color_ojos, tipo_cabello, color_cabello, complexion, tatuajes, estatura, sufrio_danio, hubo_testigos, llamo_emergencia, detalles_hechos, unidad_investigacion } = req.body;
  const query = `INSERT INTO informe (folio, identifica_caracteristicas, nombre_probable_responsable, apellido_paterno, apellido_materno, fecha_nacimiento, genero, alias, estado_domicilio, municipio_domicilio, colonia_domicilio, calle_domicilio, no_exterior_domicilio, no_interior_domicilio, color_piel, color_ojos, tipo_cabello, color_cabello, complexion, tatuajes, estatura, sufrio_danio, hubo_testigos, llamo_emergencia, detalles_hechos, unidad_investigacion)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [folio, identifica_caracteristicas, nombre_probable_responsable, apellido_paterno, apellido_materno, fecha_nacimiento, genero, alias, estado_domicilio, municipio_domicilio, colonia_domicilio, calle_domicilio, no_exterior_domicilio, no_interior_domicilio, color_piel, color_ojos, tipo_cabello, color_cabello, complexion, tatuajes, estatura, sufrio_danio, hubo_testigos, llamo_emergencia, detalles_hechos, unidad_investigacion];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el informe', error);
      res.status(500).json({ error: 'Error al crear el informe' });
    } else {
      res.json({ insertId: result.insertId });
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor backend iniciado en el puerto 3000");
});
