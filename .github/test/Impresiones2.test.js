const Impresion = require('../../src/backend/Impresion.js');

describe ("Test de impresiones", () =>{
    test("Deberia alamcenar los colores", ()=>{
       const coloresElegidos = ["AZUL","NEGRO","BLANCO"];

        const impresionesConColores = new Impresion(
            "002",
            "EnProceso",
            null,null,null,
            coloresElegidos
        );
        expect(impresionesConColores.colores).toBeDefined();
        expect(impresionesConColores.colores.length).toBe(3);

        expect(impresionesConColores.colores).toContain("NEGRO");
        expect(impresionesConColores.colores[0]).toBe("AZUL");
    });
})