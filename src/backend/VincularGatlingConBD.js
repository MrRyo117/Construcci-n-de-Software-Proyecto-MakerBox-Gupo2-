//intermediario entre entre Gatling y pgAdmin 4

import express from "express";
import pool from "./VincularAppConBD.js"; // Importa la conexión a PostgreSQL

const app = express();
const PORT = 3000; // El puerto de tu servidor de Node.js

// Tu endpoint directo que Gatling va a probar
app.get("/api/usuarios", async (req, res) => {
  try {
    // Hace el SELECT real a tu tabla en pgAdmin
    const resultado = await pool.query("SELECT * FROM usuarios");

    // Deuelve las filas a Gatling
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    res
      .status(500)
      .json({ error: "Error al obtener usuarios desde la base de datos" });
  }
});

// Levantar el servidor inmediatamente
app.listen(PORT, () => {
  console.log(`Servidor Express único escuchando en http://localhost:${PORT}`);
});
