const Usuario = require('../../src/backend/Usuario.js')

describe("Pruebas de Usuario ", () =>{
    test('El constructor se asigna correctamente', ()=> {
        const datosEjemplo = {
            id: "001",
            nombre:"Maximiliano",
            apellido:"Olea",
            correo: "max3881ol@gmail.com",
            rol: "ADMIN",
            contrasena: "callefalsa123",
            estado: true
        };

        const usuario = new Usuario(
            datosEjemplo.id,
            datosEjemplo.nombre,
            datosEjemplo.apellido,
            datosEjemplo.correo,
            datosEjemplo.rol,
            datosEjemplo.contrasena,
            datosEjemplo.estado
        );

        expect(usuario.id).toBe(datosEjemplo.id);
        expect(usuario.nombre).toBe(datosEjemplo.nombre);
        expect(usuario.apellido).toBe(datosEjemplo.apellido);
        expect(usuario.correo).toBe(datosEjemplo.correo);
        expect(usuario.rol).toBe(datosEjemplo.rol);
        expect(usuario.contrasena).toBe(datosEjemplo.contrasena);
        expect(usuario.estado).toBe(datosEjemplo.estado);
        expect(typeof usuario.estado).toBe('boolean')

    });
});

