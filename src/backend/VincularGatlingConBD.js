// Servidor Express: usado por Gatling (pruebas de carga) y por el login del frontend

import express from "express";
import cors from "cors";
import pool from "./VincularAppConBD.js"; // Importa la conexión a PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint original para Gatling
app.get("/api/usuarios", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM usuarios");
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    res
      .status(500)
      .json({ error: "Error al obtener usuarios desde la base de datos" });
  }
});

// Endpoint de login para el frontend
app.post("/api/login", async (req, res) => {
  const { rut, password } = req.body;

  if (!rut || !password) {
    return res.status(400).json({ ok: false, error: "Faltan rut o password" });
  }

  try {
    const resultado = await pool.query(
      "SELECT contrasena FROM usuarios WHERE rut = $1",
      [rut],
    );

    if (resultado.rows.length === 0) {
      return res.json({ ok: false }); // Usuario no encontrado
    }

    const contrasenaAlmacenada = resultado.rows[0].contrasena;
    const esValido = contrasenaAlmacenada === password;

    res.json({ ok: esValido });
  } catch (error) {
    console.error("Error al intentar login:", error);
    res.status(500).json({ ok: false, error: "Error en el servidor" });
  }
});

// Endpoint de registro de usuario
app.post("/api/registro", async (req, res) => {
  const { rut, nombre, apellido, correo, password, rol } = req.body;

  const rolesValidos = [
    "Administrador",
    "Profesor",
    "Ayudante",
    "Estudiante",
    "Solicitante",
  ];

  if (!rut || !nombre || !apellido || !correo || !password || !rol) {
    return res.status(400).json({
      ok: false,
      error:
        "Faltan campos obligatorios (rut, nombre, apellido, correo, password, rol)",
    });
  }

  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({
      ok: false,
      error: `Rol inválido. Debe ser uno de: ${rolesValidos.join(", ")}`,
    });
  }

  const cliente = await pool.connect();
  try {
    // Verifica que el rut o correo no estén ya registrados
    const existente = await cliente.query(
      "SELECT 1 FROM usuarios WHERE rut = $1 OR correo = $2",
      [rut, correo],
    );

    if (existente.rows.length > 0) {
      return res
        .status(409)
        .json({
          ok: false,
          error: "Ya existe un usuario con ese rut o correo",
        });
    }

    // Calcula el siguiente id disponible (id_usuario no es autoincremental)
    const idResultado = await cliente.query(
      "SELECT COALESCE(MAX(id_usuario), 0) + 1 AS siguiente_id FROM usuarios",
    );
    const nuevoId = idResultado.rows[0].siguiente_id;

    const insertado = await cliente.query(
      `INSERT INTO usuarios (id_usuario, rut, nombre, apellido, correo, contrasena, usuario_rol)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id_usuario, rut, nombre, apellido, correo, usuario_rol`,
      [nuevoId, rut, nombre, apellido, correo, password, rol],
    );

    res.status(201).json({ ok: true, usuario: insertado.rows[0] });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ ok: false, error: "Error en el servidor" });
  } finally {
    cliente.release();
  }
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
