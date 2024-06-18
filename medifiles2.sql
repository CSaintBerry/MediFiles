-- Crear la base de datos
CREATE DATABASE medifiles;
USE medifiles;

-- Crear la tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    numero_colegio_medico VARCHAR(50),
    numero_telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('medico', 'enfermera', 'personal_historias_medicas') NOT NULL
);

-- Crear la tabla de pacientes
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_apellido VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    sexo ENUM('masculino', 'femenino') NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    nombre_madre VARCHAR(100) NOT NULL,
    nombre_padre VARCHAR(100) NOT NULL,
    edad_madre INT NOT NULL,
    edad_padre INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- Crear la tabla de historias clínicas
CREATE TABLE clinical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    motivo_consulta TEXT,
    enfermedad_actual TEXT,
    embarazo_controlado ENUM('si', 'no'),
    peso_nacer FLOAT,
    talla_nacer FLOAT,
    tipo_parto ENUM('pes', 'parto_distocico', 'cesarea_segmentaria'),
    respiro_lloro ENUM('si', 'no'),
    hospitalizado ENUM('si', 'no'),
    lactancia_materna BOOLEAN,
    formula_complementaria BOOLEAN,
    alimentacion_actual TEXT,
    gateo INT,
    se_paro INT,
    primeros_pasos INT,
    se_volteo INT,
    primer_diente INT,
    bcg_recien_nacido BOOLEAN,
    hepatitis_recien_nacido BOOLEAN,
    otras_vacunas TEXT,
    menarquia INT,
    eumenorreica BOOLEAN,
    dismenorreica BOOLEAN,
    hospitalizaciones TEXT,
    asma BOOLEAN,
    diabetes BOOLEAN,
    antecedentes_familiares TEXT,
    peso FLOAT,
    talla FLOAT,
    cc VARCHAR(50),
    temperatura FLOAT,
    fc INT,
    fr INT,
    piel TEXT,
    cabeza_cuello TEXT,
    cardiopulmonar TEXT,
    abdomen TEXT,
    extremidades TEXT,
    genitales TEXT,
    recto TEXT,
    neurologico TEXT,
    diagnostico TEXT,
    tratamiento TEXT,
    proxima_cita DATE,
    deleted BOOLEAN DEFAULT FALSE,
    reason_deleted TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Crear la tabla de cola
CREATE TABLE queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Crear la tabla de reportes
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    medico_id INT,
    cantidad_pacientes INT,
    FOREIGN KEY (medico_id) REFERENCES users(id)
);
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    cedula VARCHAR(50) NOT NULL,
    direccion TEXT NOT NULL,
    numero_colegio_medico VARCHAR(50),
    numero_telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE references (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    nombre_paciente VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
    explicacion TEXT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);
