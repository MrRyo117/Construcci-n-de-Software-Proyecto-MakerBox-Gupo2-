
CREATE TYPE rol AS ENUM('Administrador', 'Profesor', 'Ayudante', 'Estudiante','Solicitante');

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY NOT NULL,
    rut VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    usuario_rol rol NOT NULL,
    borrado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);