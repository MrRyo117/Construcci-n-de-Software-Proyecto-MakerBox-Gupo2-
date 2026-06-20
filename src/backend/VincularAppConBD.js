//permite conectarse a la base de datos que esta en pgAdmin 4

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(
      "Error al conectar a la base de datos de pgAdmin:",
      err.stack,
    );
  } else {
    console.log(
      "Conexión exitosa a PostgreSQL. Hora del servidor:",
      res.rows[0].now,
    );
  }
});

export default pool;
