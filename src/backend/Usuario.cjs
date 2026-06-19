const { agregarUsuario } = require("./ConectarBD.cjs"); 

class Usuario {
  constructor(id, rut, nombre, apellido, correo, rol, contrasena, activo = true) {
    this.id = id;
    this.rut = rut;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.rol = rol;
    this.contrasena = contrasena;
    this.activo = activo;
  }

  static validarRut(rut) {
    if (!rut || typeof rut !== 'string') return false;

    const rutLimpio = rut.trim().replace(/[^0-9kK]/g, '');
    if (rutLimpio.length < 2) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dvUsuario = rutLimpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    
    let dvCalculado;
    if (dvEsperado === 11) dvCalculado = '0';
    else if (dvEsperado === 10) dvCalculado = 'K';
    else dvCalculado = dvEsperado.toString();

    console.log(`DEBUG RUT -> Cuerpo: ${cuerpo} | DV Usuario: ${dvUsuario} | DV Calculado: ${dvCalculado}`);

    return dvUsuario === dvCalculado;
  }

  async agregarUsuario() {
    if (!Usuario.validarRut(this.rut)){
      throw new Error ("El rut ingresado no es valido.");
    }

    const ConectarBD = require("./ConectarBD.cjs");
    return await ConectarBD.agregarUsuario(
      this.id,
      this.rut,
      this.nombre,
      this.apellido,
      this.correo,
      this.contrasena,
      this.rol
    );
  }
}

module.exports = Usuario; 