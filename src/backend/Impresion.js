class Impresion{

    constructor(
        id,
        estado,
        solicitante = null,
        estudiante = null,
        ayudante = null,
        colores = [],
        tipoSolicitud = null,
        curso = null,
        tiempoEstimado = null,
        archivos = [],
        comentario = "",
        articuloUtilizado = null,
    ){
        this.id = id;
        this.Estado = estado;
        this.solicitante = solicitante;
        this.ayudante = ayudante;
        this.colores = colores;
        this.tipoSolicitud = tipoSolicitud;
        this.curso = curso;
        this.tiempoEstimado = tiempoEstimado;
        this.archivos = archivos;
        this.comentario = comentario;
        this.articuloUtilizado = articuloUtilizado;
    }
}

module.exports = Impresion;