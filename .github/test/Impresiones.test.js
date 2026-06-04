const Impresion = require('../../src/backend/Impresion.js')

describe("Test de Impresiones",() => {
    test("Constructor creado correctamente", ()=>{
        const datosEjemplo = {
            id: "001",
            Estado: "Pendiente"
        }

        const impresion = new Impresion(
            datosEjemplo.id,
            datosEjemplo.Estado
        );

        expect(impresion.id).toBe("001");
        expect(impresion.Estado).toBe(datosEjemplo.Estado);
    });
});