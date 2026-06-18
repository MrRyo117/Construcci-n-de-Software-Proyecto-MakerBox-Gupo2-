class ReservasSala{

    constructor(
        id,
        fecha,
        estado,
        motivo,
        bloqueaReserva ,
        ayudante ,
    ){
        this.id = id;
        this.fecha = fecha;
        this.estado = estado;
        this.motivo = motivo;
        this.bloqueaReserva = bloqueaReserva;
        this.ayudante = ayudante;
    }
}

module.exports = ReservasSala;