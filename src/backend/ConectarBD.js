const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "MakerBox",
});

async function agregarUsuario(
  id,
  rut,
  nombre,
  apellido,
  correo,
  password,
  rol,
) {
  const cliente = await pool.connect();
  try {
    const resultado = await cliente.query(
      "INSERT INTO usuarios (id_usuario, rut, nombre, apellido, correo, contrasena, usuario_rol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, rut, nombre, apellido, correo, password, rol],
    );
    console.table(resultado.rows);
    console.log("Usuario agregado exitosamente");
    return resultado.rows[0];
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    throw error;
  } finally {
    cliente.release();
  }
}

async function existeUsuario(rut) {
  const cliente = await pool.connect();
  try {
    const resultado = await cliente.query(
      "SELECT 1 FROM usuarios WHERE rut = $1",
      [rut],
    );
    return resultado.rows.length > 0;
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    throw error;
  } finally {
    cliente.release();
  }
}

async function eliminarUsuario(rut) {
  const cliente = await pool.connect();
  try {
    await cliente.query("DELETE FROM usuarios WHERE rut = $1", [rut]);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  } finally {
    cliente.release();
  }
}

async function cerrarPool() {
  await pool.end();
}

module.exports = { agregarUsuario, existeUsuario, eliminarUsuario, cerrarPool };
