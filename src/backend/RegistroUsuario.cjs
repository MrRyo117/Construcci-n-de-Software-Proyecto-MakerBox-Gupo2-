const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const Usuario = require("./Usuario.cjs"); 

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

    const nuevoUsuario = new Usuario(id, rut, nombre, apellido, correo, rol, contrasena);

    console.log("->Rut guardado en instancia: ", nuevoUsuario.rut);
    await nuevoUsuario.agregarUsuario();

    console.log("Usuario registrado correctamente");
  } catch (error) {
    console.log(" Error al registrar el usuario:", error.message);
  } finally {
    rl.close();
  }
}

registrarUsuario();