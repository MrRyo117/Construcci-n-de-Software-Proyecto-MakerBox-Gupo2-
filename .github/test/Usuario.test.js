const Usuario = require("../../src/backend/Usuario.js");

describe("Pruebas de Usuario ", () => {
  test("El constructor se asigna correctamente", () => {
    const datosEjemplo = {
      id: "001",
      rut: "11111111-1",
      nombre: "Maximiliano",
      apellido: "Olea",
      correo: "max3881ol@gmail.com",
      rol: "ADMIN",
      contrasena: "callefalsa123",
      estado: true,
    };

    const usuario = new Usuario(
      datosEjemplo.id,
      datosEjemplo.rut,
      datosEjemplo.nombre,
      datosEjemplo.apellido,
      datosEjemplo.correo,
      datosEjemplo.rol,
      datosEjemplo.contrasena,
      datosEjemplo.estado,
    );

    expect(usuario.id).toBe(datosEjemplo.id);
    expect(usuario.nombre).toBe(datosEjemplo.nombre);
    expect(usuario.apellido).toBe(datosEjemplo.apellido);
    expect(usuario.correo).toBe(datosEjemplo.correo);
    expect(usuario.rol).toBe(datosEjemplo.rol);
    expect(usuario.contrasena).toBe(datosEjemplo.contrasena);
    expect(usuario.estado).toBe(datosEjemplo.estado);
    expect(typeof usuario.estado).toBe("boolean");
  });

  test("El usuario es un estudiante", () => {
    const datosEjemplo = {
      id: "002",
      rut: "22222222-2",
      nombre: "Maria",
      apellido: "Olea",
      correo: "mar41ol@gmail.com",
      rol: "Estudiante",
      contrasena: "ws3r1n",
      estado: true,
    };

    const usuario2 = new Usuario(
      datosEjemplo.id,
      datosEjemplo.rut,
      datosEjemplo.nombre,
      datosEjemplo.apellido,
      datosEjemplo.correo,
      datosEjemplo.rol,
      datosEjemplo.contrasena,
      datosEjemplo.estado,
    );

    expect(usuario2.rol).toBe("Estudiante");
  });
});
