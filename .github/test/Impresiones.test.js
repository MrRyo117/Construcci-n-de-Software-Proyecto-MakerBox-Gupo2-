const Impresiones = requiere('../../src/backend/Usuario.js')

describe("Test de Impresiones",() => {
    test("Constructor creado correctamente", ()=>{
        const datosEjemplo = {
            id: "001",
            Estado: "Pendiente"
        }

        const Impresion = new Impresion(
            datosEjemplo.id,
            datosEjemplo.Estado
        );

        expect(Impresion.id).toBe(datosEjemplo.id);
        expect(Impresion.Estado).toBe(datosEjemplo.Impresion);
    });
});