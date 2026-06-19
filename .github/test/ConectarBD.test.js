const ConectarBD = require("../../src/backend/ConectarBD.cjs");
const { Pool } = require("pg");

jest.mock("pg", () => {
    const mClient = {
        query: jest.fn(),
        release: jest.fn(),
    };

    const mPool = {
        connect: jest.fn(() => Promise.resolve(mClient)),
        end: jest.fn(() => Promise.resolve()),
    };
    return { Pool: jest.fn(() => mPool) };
});

describe("Pruebas de Cobertura para ConectarBD", () => {
    let poolInstance;
    let clientMock;

    beforeEach(async () => {
        jest.clearAllMocks();
        poolInstance = new Pool();
        clientMock = await poolInstance.connect();
    });

    afterAll(async () => {
        await ConectarBD.cerrarPool(); 
    });

    test("validarUsuario deberia retornar true si la contraseña coincide", async () => {
        clientMock.query.mockResolvedValueOnce({ rows: [{ contrasena: "123" }] });
        const esValido = await ConectarBD.validarUsuario("19140730-K", "123");
        expect(esValido).toBe(true);
    });

    test("validarUsuario deberia retornar false si el usuario no existe", async () => {
        clientMock.query.mockResolvedValueOnce({ rows: [] });
        const esValido = await ConectarBD.validarUsuario("19140730-K", "123");
        expect(esValido).toBe(false);
    });

    test("agregarUsuario deberia tirar un error si la query falla", async () => {
        clientMock.query.mockRejectedValueOnce(new Error("Error simulado"));
        await expect( 
            ConectarBD.agregarUsuario("001", "1-9", "A", "B", "a@a.com", "123", "User")
        ).rejects.toThrow("Error simulado");
    });

    test("existeUsuario deberia tirar un error si la query falla", async () => {
        clientMock.query.mockRejectedValueOnce(new Error("Error simulado"));
        await expect(ConectarBD.existeUsuario("1-9")).rejects.toThrow("Error simulado");
    });

    test("eliminarUsuario deberia tirar un error si la query falla", async () => {
        clientMock.query.mockRejectedValueOnce(new Error("Error simulado"));
        await expect(ConectarBD.eliminarUsuario("1-9")).rejects.toThrow("Error simulado");
    });

    test("validarUsuario deberia tirar un error si la query falla", async () => {
        clientMock.query.mockRejectedValueOnce(new Error("Error simulado"));
        await expect(ConectarBD.validarUsuario("1-9", "123")).rejects.toThrow("Error simulado");
    });
});