const fs = require("fs");
const path = require("path");
const Usuario = require("../../src/backend/Usuario.cjs");
const GestorUsuarios = require("../../src/backend/GestorUsuarios.js");

const rutaArchivoTest = path.join(__dirname, "usuarios_test.json");

describe("Pruebas de integracion - Usuario con GestorUsuarios", () => {
  let gestor;

  beforeAll(() => {
    gestor = new GestorUsuarios(rutaArchivoTest);
  });

  afterEach(() => {
    if (fs.existsSync(rutaArchivoTest)) {
      fs.unlinkSync(rutaArchivoTest);
    }
  });

  test("Deberia integrar la clase Usuario con GestorUsuario", () => {
    const nuevoUsuario = new Usuario(
      "001",
      "33333333-3",
      "Matias",
      "Olea",
      "matias.olea@gmail.com",
      "USER",
      "password123",
      true,
    );

    const resultadoGuardado = gestor.guardarUsuario(nuevoUsuario);
    expect(resultadoGuardado).toBe(true);

    const usuarioRecuperado = gestor.obtenerporId("001");

    expect(usuarioRecuperado).not.toBeNull();
    expect(usuarioRecuperado instanceof Usuario).toBe(true);
    expect(usuarioRecuperado.id).toBe(nuevoUsuario.id);
    expect(usuarioRecuperado.nombre).toBe("Matias");
    expect(usuarioRecuperado.correo).toBe("matias.olea@gmail.com");
    expect(usuarioRecuperado.activo).toBe(true);
  });
});
