const { agregarUsuario } = require("./ConectarBD.js");

class Usuario {
  constructor(id, rut, nombre, apellido, correo, rol, contrasena, estado) {
    this.id = id;
    this.rut = rut;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.rol = rol;
    this.contrasena = contrasena;
    this.estado = estado;
  }
  async agregarUsuario() {
    try {
      const resultado = await agregarUsuario(
        this.id,
        this.rut,
        this.nombre,
        this.apellido,
        this.correo,
        this.contrasena,
        this.rol,
      );
      return resultado;
    } catch (error) {
      console.error("Error al agregar usuario", error);
      throw error;
    }
  }
}

module.exports = Usuario;
