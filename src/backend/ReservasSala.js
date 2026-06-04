class ReservasSala{

    constructor(
        id,
        fecha,
        estado,
        motivo,
        bloqueReserva ,
        ayudante ,
    ){
        this.id = id;
        this.fecha = fecha;
        this.estado = estado;
        this.motivo = motivo;
        this.bloqueReserva = bloqueReserva;
        this.ayudante = ayudante;
    }
}

module.exports = ReservasSala;