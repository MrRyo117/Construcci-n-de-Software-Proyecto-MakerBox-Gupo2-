const Usuario = require(' ../backend/Usuario')

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

        const Usuario = new Usuario(
            datosEjemplo.id,
            datosEjemplo.nombre,
            datosEjemplo.apellido,
            datosEjemplo.correo,
            datosEjemplo.rol,
            datosEjemplo.contrasena,
            datosEjemplo.estado
        );

        expect(Usuario.id).toBe(datosEjemplo.id);
        expect(Usuario.nombre).toBe(datosEjemplo.nombre);
        expect(Usuario.apellido).toBe(datosEjemplo.apellido);
        expect(Usuario.correo).toBe(datosEjemplo.correo);
        expect(Usuario.rol).toBe(datosEjemplo.rol);
        expect(Usuario.contrasena).toBe(datosEjemplo.contrasena);
        expect(Usuario.estado).toBe(datosEjemplo.estado);
        expect(typeof usuario.estado).toBe('boolean')

    });
});

