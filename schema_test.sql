DROP DATABASE IF EXISTS dating_app_test;
CREATE DATABASE dating_app_test;

\c dating_app_test

CREATE TABLE "users" (
"user_id"  SERIAL NOT NULL,
"email" VARCHAR NOT NULL,
"password" VARCHAR(250) NOT NULL,
"face_image" VARCHAR(250) NOT NULL,
"body_image" VARCHAR(250) NOT NULL DEFAULT 'NULL',
"description" VARCHAR(500) NOT NULL DEFAULT 'NULL',
"message" VARCHAR NOT NULL,
"crushes" VARCHAR NOT NULL,
"fans" VARCHAR NOT NULL,
PRIMARY KEY ("user_id")
);

CREATE TABLE "crush" (
"user_id" SERIAL NOT NULL,
"fan_ids" VARCHAR NOT NULL,
"crush_ids" VARCHAR NOT NULL,
PRIMARY KEY ("user_id")
);

ALTER TABLE "crush" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
