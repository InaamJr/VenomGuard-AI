CREATE DATABASE IF NOT EXISTS venomguard;
USE venomguard;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

CREATE TABLE species (
    species_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    habitat VARCHAR(255),
    venom_potency VARCHAR(50),
    venomous BOOLEAN DEFAULT TRUE
);

CREATE TABLE symptom (
    symptom_id INT AUTO_INCREMENT PRIMARY KEY,
    species_id INT,
    symptom_description TEXT NOT NULL,
    severity_level VARCHAR(50),
    FOREIGN KEY (species_id) REFERENCES species(species_id)
        ON DELETE CASCADE
);

CREATE TABLE action (
    action_id INT AUTO_INCREMENT PRIMARY KEY,
    species_id INT,
    action_description TEXT NOT NULL,
    action_type VARCHAR(50),
    FOREIGN KEY (species_id) REFERENCES species(species_id)
        ON DELETE CASCADE
);

CREATE TABLE identification (
    identification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    species_id INT,
    location_id INT,
    image_path VARCHAR(255),
    confidence_score DECIMAL(5,2),
    identified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
        ON DELETE SET NULL,
    FOREIGN KEY (species_id) REFERENCES species(species_id)
        ON DELETE SET NULL,
    FOREIGN KEY (location_id) REFERENCES location(location_id)
        ON DELETE SET NULL
);

SHOW TABLES;

DESCRIBE species;

ALTER TABLE user
ADD COLUMN password VARCHAR(255) NOT NULL AFTER phone;

INSERT INTO user (user_id, name, email, phone, password) VALUES (1, 'Guest', 'guest@venomguard.ai', '0000000000', '123');species

USE venomguard;

ALTER TABLE identification
DROP COLUMN location_id,
ADD COLUMN latitude FLOAT,
ADD COLUMN longitude FLOAT;

ALTER TABLE identification
DROP FOREIGN KEY identification_ibfk_3;

SHOW CREATE TABLE identification;

ALTER TABLE identification
DROP COLUMN location_id,
ADD COLUMN latitude FLOAT,
ADD COLUMN longitude FLOAT;












