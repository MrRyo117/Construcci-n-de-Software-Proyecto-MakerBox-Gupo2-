
CREATE TYPE rol AS ENUM('Administrador', 'Profesor', 'Ayudante', 'Estudiante','Solicitante');
CREATE TYPE estado_semestre AS ENUM('Activo', 'Finalizado');
CREATE TYPE estado_impresion AS ENUM('Pendiente', 'En Proceso', 'Finalizado', 'Cancelado');

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY NOT NULL,
    rut VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    usuario_rol rol NOT NULL,
    borrado_en TIMESTAMP,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE semestre (
    id_semestre VARCHAR(50) PRIMARY KEY NOT NULL,
    anio INT NOT NULL,
    periodo INT NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    estado estado_semestre NOT NULL
);

CREATE TABLE curso (
    id_curso VARCHAR(50) PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    ref_semestre VARCHAR(50) NOT NULL,
    ref_profesor INT NOT NULL,
    borrado_en TIMESTAMP,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ref_profesor) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (ref_semestre) REFERENCES semestre(id_semestre)
);

CREATE TABLE estudiante_curso (
    ref_curso VARCHAR(50) NOT NULL,
    ref_estudiante INT NOT NULL,
    PRIMARY KEY (ref_curso, ref_estudiante),
    FOREIGN KEY (ref_curso) REFERENCES curso(id_curso),
    FOREIGN KEY (ref_estudiante) REFERENCES usuarios(id_usuario)
);

CREATE TABLE impresion (
    id_impresion VARCHAR(50) PRIMARY KEY NOT NULL,
    solicitante_nombre VARCHAR(50),
    solicitante_apellido VARCHAR(50),
    solicitante_correo VARCHAR(100),
    solicitante_rut VARCHAR(10),
    ref_estudiante VARCHAR(50),
    tipo_usuario VARCHAR(50),
    tipo_solicitud VARCHAR(50),
    nombre_curso VARCHAR(100),
    ref_curso VARCHAR(50),
    color_opcion1 VARCHAR(50) NOT NULL,
    color_opcion2 VARCHAR(50) NOT NULL,
    color_opcion3 VARCHAR(50) NOT NULL,
    comentario_tecnico TEXT,
    url_modelo_3d VARCHAR(255) NOT NULL,
    url_modelo_stl VARCHAR(255) NOT NULL,
    comentario TEXT NOT NULL,
    estado estado_impresion NOT NULL
);