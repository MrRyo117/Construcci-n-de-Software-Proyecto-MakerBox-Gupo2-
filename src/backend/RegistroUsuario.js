import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { agregarUsuario } from "./ConectarBD.js";

async function registrarUsuario() {
  const rl = readline.createInterface({ input, output });

  console.log("=== Registro de Usuario ===");
  try {
    const id = await rl.question("ID: ");
    const rut = await rl.question("RUT: ");
    const nombre = await rl.question("Nombre: ");
    const apellido = await rl.question("Apellido: ");
    const correo = await rl.question("Correo: ");
    const contrasena = await rl.question("Contraseña: ");
    const rol = await rl.question("Rol: ");
    await agregarUsuario(id, rut, nombre, apellido, correo, contrasena, rol);
    console.log("Usuario registrado exitosamente.");
  } catch (error) {
    console.error("Error al registrar usuario", error);
  } finally {
    rl.close();
  }
}

registrarUsuario();
