DROP DATABASE IF EXISTS dating_app;
CREATE DATABASE dating_app;

\c dating_app

DROP TABLE IF EXISTS daters;
CREATE TABLE daters (
dater_id  SERIAL PRIMARY KEY,
email VARCHAR(500) NOT NULL UNIQUE,
password VARCHAR(500) NOT NULL,
face_image VARCHAR(500) NOT NULL,
body_image VARCHAR(500) NOT NULL,
description VARCHAR(500) NOT NULL,
message VARCHAR(500),
crushes VARCHAR(500),
fans VARCHAR(500)
);

DROP TABLE IF EXISTS crush;
CREATE TABLE crush (
dater_id SERIAL NOT NULL,
fan_ids VARCHAR(500),
crush_ids VARCHAR(500)
);
