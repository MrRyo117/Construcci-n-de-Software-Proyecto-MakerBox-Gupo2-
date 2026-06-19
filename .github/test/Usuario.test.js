
const Usuario = require("../../src/backend/Usuario.cjs");

describe("Pruebas de Usuario ", () => {
  test("El constructor se asigna correctamente", () => {
    const datosEjemplo = {
      id: "001",
      rut: "19403824-0",
      nombre: "Maximiliano",
      apellido: "Olea",
      correo: "max3881ol@gmail.com",
      rol: "ADMIN",
      contrasena: "callefalsa123",
      activo: true,
    };

    const usuario = new Usuario(
      datosEjemplo.id,
      datosEjemplo.rut,
      datosEjemplo.nombre,
      datosEjemplo.apellido,
      datosEjemplo.correo,
      datosEjemplo.rol,
      datosEjemplo.contrasena,
      datosEjemplo.activo,
    );

    expect(usuario.id).toBe(datosEjemplo.id);
    expect(usuario.nombre).toBe(datosEjemplo.nombre);
    expect(usuario.apellido).toBe(datosEjemplo.apellido);
    expect(usuario.correo).toBe(datosEjemplo.correo);
    expect(usuario.rol).toBe(datosEjemplo.rol);
    expect(usuario.contrasena).toBe(datosEjemplo.contrasena);
    expect(usuario.activo).toBe(datosEjemplo.activo); 
    expect(typeof usuario.activo).toBe("boolean");
  });

  test("El usuario es un estudiante", () => {
    const datosEjemplo = {
      id: "002",
      rut: "19140730-K",
      nombre: "Maria",
      apellido: "Olea",
      correo: "mar41ol@gmail.com",
      rol: "Estudiante",
      contrasena: "ws3r1n",
      activo: true,
    };

    const usuario2 = new Usuario(
      datosEjemplo.id,
      datosEjemplo.rut,
      datosEjemplo.nombre,
      datosEjemplo.apellido,
      datosEjemplo.correo,
      datosEjemplo.rol,
      datosEjemplo.contrasena,
      datosEjemplo.activo,
    );

    expect(usuario2.rol).toBe("Estudiante");
  });

  describe("Validacion de Rut", () => {
    test("Deberia retornar True para un rut chileno valido ", () => {
      expect(Usuario.validarRut('19.403.824-0')).toBe(true);
      expect(Usuario.validarRut('19.140.730-K')).toBe(true);
    });

    test("Deberia retornar false para un rut incorrecto o invalido", () => {
      expect(Usuario.validarRut('11111111-2')).toBe(false);
      expect(Usuario.validarRut(null)).toBe(false);
      expect(Usuario.validarRut(1234567)).toBe(false);
    });

    test("Deberia tirar error si intentamos agregar un usuario con rut invalido", async () => {
      const usuarioInvalido = new Usuario(
        999,
        "12.345.678-9",
        "Error",
        "Tset",
        "error@oultook.cl",
        "Estudiante",
        "password"
      );

      await expect(usuarioInvalido.agregarUsuario()).rejects.toThrow(
        "El rut ingresado no es valido."
      );
    });
  });
});