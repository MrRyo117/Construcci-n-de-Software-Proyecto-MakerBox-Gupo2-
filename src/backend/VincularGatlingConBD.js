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

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
