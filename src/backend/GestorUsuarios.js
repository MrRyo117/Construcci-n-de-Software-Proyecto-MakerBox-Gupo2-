const fs = require("fs");
const path = require("path");
const Usuario = require("./Usuario.cjs");

class GestorUsuarios {
  constructor(rutaArchivo) {
    this.rutaArchivo = rutaArchivo || path.join(__dirname, "usuarios.json");
  }

  guardarUsuario(usuario) {
    let usuarios = this.obtenerTodos();

    const index = usuarios.findIndex((u) => u.id === usuario.id);
    if (index !== -1) {
      usuarios[index] = usuario;
    } else {
      usuarios.push(usuario);
    }

    fs.writeFileSync(
      this.rutaArchivo,
      JSON.stringify(usuarios, null, 2),
      "utf8",
    );
    return true;
  }

  obtenerporId(id) {
    const usuarios = this.obtenerTodos();
    const datosUsuario = usuarios.find((u) => u.id === id);

    if (!datosUsuario) return null;

    return new Usuario(
      datosUsuario.id,
      datosUsuario.rut,
      datosUsuario.nombre,
      datosUsuario.apellido,
      datosUsuario.correo,
      datosUsuario.rol,
      datosUsuario.contrasena,
      datosUsuario.estado,
    );
  }

  obtenerTodos() {
    if (!fs.existsSync(this.rutaArchivo)) {
      return [];
    }
    try {
      const contenido = fs.readFileSync(this.rutaArchivo, "utf8");
      return JSON.parse(contenido) || [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = GestorUsuarios;
