CREATE TABLE victimas (
  id SERIAL PRIMARY KEY,
  id_denunciante INTEGER REFERENCES denunciantes(id),
  folio VARCHAR(255),
  nombre VARCHAR(255),
  apellido_paterno VARCHAR(255),
  apellido_materno VARCHAR(255),
  fecha_nacimiento DATE,
  genero VARCHAR(255),
  escolaridad VARCHAR(255),
  correo_electronico VARCHAR(255),
  estado VARCHAR(255),
  municipio VARCHAR(255),
  colonia VARCHAR(255),
  codigo_postal VARCHAR(10),
  calle VARCHAR(255),
  no_exterior VARCHAR(10),
  no_interior VARCHAR(10),
  tel_celular VARCHAR(15),
  tel_fijo VARCHAR(15),
  es_victima VARCHAR(15)
);

CREATE TABLE domicilio (
  id SERIAL PRIMARY KEY,
  folio VARCHAR(255) UNIQUE,
  fecha_hecho DATE,
  hora_hecho TIME,
  estado_hecho VARCHAR(255),
  municipio_hecho VARCHAR(255),
  colonia_hecho VARCHAR(255),
  codigo_postal_hecho VARCHAR(10),
  calle_hecho VARCHAR(255),
  no_exterior_hecho VARCHAR(10),
  no_interior_hecho VARCHAR(10)
);

CREATE TABLE informe (
  id SERIAL PRIMARY KEY,
  folio VARCHAR(255) UNIQUE,
  nombre_probable_responsable VARCHAR(255),
  apellido_paterno VARCHAR(255),
  apellido_materno VARCHAR(255),
  fecha_nacimiento DATE,
  genero VARCHAR(255),
  alias VARCHAR(255),
  estado_domicilio VARCHAR(255),
  municipio_domicilio VARCHAR(255),
  colonia_domicilio VARCHAR(255),
  calle_domicilio VARCHAR(255),
  no_exterior_domicilio VARCHAR(10),
  no_interior_domicilio VARCHAR(10),
  color_piel VARCHAR(255),
  color_ojos VARCHAR(255),
  tipo_cabello VARCHAR(255),
  color_cabello VARCHAR(255),
  complexion VARCHAR(255),
  tatuajes VARCHAR(15),
  estatura FLOAT,
  tipo_delito VARCHAR(55),
  sufrio_danio VARCHAR(15),
  hubo_testigos VARCHAR(15),
  llamo_emergencia VARCHAR(15),
  detalles_hechos TEXT,
  unidad_investigacion VARCHAR(255)
);

CREATE TABLE seguimiento (
  id SERIAL PRIMARY KEY,
  folio VARCHAR(255) UNIQUE,
  estado VARCHAR(255),
  seguimiento varchar(255)
);

Select * from victimas;
Select * from domicilio;
Select * from informe;
Select * from seguimiento;

DELETE FROM victimas WHERE id = 1;
DELETE FROM domicilio WHERE id = 1;
DELETE FROM informe WHERE id = 1;
DELETE FROM seguimiento WHERE id = 1;

SELECT MAX(folio) AS max_folio FROM victimas;

-- Insertar datos en la tabla "victimas"
INSERT INTO victimas (id_denunciante, folio, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, genero, escolaridad, correo_electronico, estado, municipio, colonia, codigo_postal, calle, no_exterior, no_interior, tel_celular, tel_fijo, es_victima)
VALUES (1, '1', 'María', 'López', 'García', '1990-05-10', 'Femenino', 'Universidad', 'maria@example.com', 'Jalisco', 'Guadalajara', 'Centro', '44100', 'Calle Principal', '123', 'A', '9876543210', '9876543210', 'Si');

-- Insertar datos en la tabla "domicilio"
INSERT INTO domicilio (folio, fecha_hecho, hora_hecho, estado_hecho, municipio_hecho, colonia_hecho, codigo_postal_hecho, calle_hecho, no_exterior_hecho, no_interior_hecho)
VALUES ('FOLIO123', '2023-05-22', '12:30:00', 'Jalisco', 'Guadalajara', 'Centro', '44100', 'Calle Principal', '123', 'A');

-- Insertar datos en la tabla "informe"
INSERT INTO informe (folio, nombre_probable_responsable, apellido_paterno, apellido_materno, fecha_nacimiento, genero, alias, estado_domicilio, municipio_domicilio, colonia_domicilio, calle_domicilio, no_exterior_domicilio, no_interior_domicilio, color_piel, color_ojos, tipo_cabello, color_cabello, complexion, tatuajes, estatura, tipo_delito, sufrio_danio, hubo_testigos, llamo_emergencia, detalles_hechos, unidad_investigacion)
VALUES ('FOLIO123', 'Pedro', 'Gómez', 'López', '1992-03-15', 'Masculino', 'El Chino', 'Jalisco', 'Guadalajara', 'Colonia Centro', 'Calle Principal', '456', 'B', 'Morena', 'Café', 'Corto', 'Negro', 'Delgada', '1', 1.75, 'Robo', '1', '1', '1', 'Los hechos ocurrieron en la esquina de la calle...', 'UI-123');

Drop Table victimas;
Drop Table domicilio;
Drop Table informe;
Drop Table seguimiento;