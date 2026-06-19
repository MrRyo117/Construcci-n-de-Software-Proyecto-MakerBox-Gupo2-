const Usuario = require("../../src/backend/Usuario.cjs");
const {
  existeUsuario,
  eliminarUsuario,
  cerrarPool,
} = require("../../src/backend/ConectarBD.cjs");

describe("Pruebas de Integracion - Agregar usuario a BD", () => {
  const RUT_TEST = "99999999-9";
  const ID_TEST = 9999;
  beforeAll(async () => {
    await eliminarUsuario(RUT_TEST);
  });

  afterAll(async () => {
    await eliminarUsuario(RUT_TEST);
    await cerrarPool();
  });

  test("Deberia agregar un usuario con ID específico", async () => {
    const usuario = new Usuario(
      ID_TEST,
      RUT_TEST,
      "Pedro",
      "Gonzalez",
      "pedro@email.com",
      "Estudiante",
      "password123",
      true,
    );

    const resultado = await usuario.agregarUsuario();

    expect(resultado).toBeDefined();
    expect(resultado.id_usuario).toBe(ID_TEST);
    expect(resultado.rut).toBe(RUT_TEST);
    expect(resultado.nombre).toBe("Pedro");
    expect(resultado.apellido).toBe("Gonzalez");
    expect(resultado.correo).toBe("pedro@email.com");
    expect(resultado.usuario_rol).toBe("Estudiante");

    const existe = await existeUsuario(RUT_TEST);
    expect(existe).toBe(true);
  });
});
