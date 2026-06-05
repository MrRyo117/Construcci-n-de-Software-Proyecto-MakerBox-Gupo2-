const ReservasSala = require('../../src/backend/ReservasSala.js')


describe("Pruebas de la clase ReservasSala", ()=>{
    test('El constructor asigna los atributos correctamente según el diagrama de clase', () =>{
        const ayudanteMOCK = {id: "AYU-01", nombre: 'Joaquin'};
        const bloquesMOCK =[
            {id: "B1", horaInicio: "08:30", horaFin: "10:50"},
            {id: "B2", horaInicio: "11:00", horaFin: "13:20"}
        ];

        const datosReserva = {
            id: "RES-2026",
            fecha: new Date("2026-06-04"),
            estado: "Reservado",
            motivo: "Solemne de Programacion",
            bloqueaReserva: bloquesMOCK,
            ayudante: ayudanteMOCK
        };

        const reserva = new ReservasSala(
            datosReserva.id,
            datosReserva.fecha,
            datosReserva.estado,
            datosReserva.motivo,
            datosReserva.bloqueaReserva,
            datosReserva.ayudante

        );

        expect(reserva.id).toBe(datosReserva.id);
        expect(reserva.fecha).toBe(datosReserva.fecha);
        expect(reserva.estado).toBe("Reservado");
        expect(reserva.motivo).toBe(datosReserva.motivo);

        expect(reserva.bloqueaReserva.length).toBe(2);
        expect(reserva.bloqueaReserva[0].horaInicio).toBe("08:30");
        expect(reserva.ayudante.id).toBe("AYU-01");

    });

    test('El estado de la reserva es "disponible"', ()=>{
        const ayudanteMOCK = {id: "AYU-02", nombre: 'Joana'};
        const bloquesMOCK =[
            {id: "B1", horaInicio: "08:30", horaFin: "10:50"},
            {id: "B2", horaInicio: "11:00", horaFin: "13:20"}
        ];

        const datosReserva = {
            id: "RES-2026",
            fecha: new Date("2026-06-10"),
            estado: "Disponible",
            motivo: "Abierto para Impresion",
            bloqueaReserva: bloquesMOCK,
            ayudante: ayudanteMOCK
        };

        const reserva = new ReservasSala(
            datosReserva.id,
            datosReserva.fecha,
            datosReserva.estado,
            datosReserva.motivo,
            datosReserva.bloqueaReserva,
            datosReserva.ayudante

        );

        expect(reserva.estado).toBe("Disponible");

    });


}) ;