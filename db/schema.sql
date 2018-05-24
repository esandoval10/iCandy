DROP DATABASE IF EXISTS icandy;

CREATE DATABASE icandy;

USE icandy;

CREATE TABLE bmi_data(
    id int auto_increment NOT NULL,
    user_name varchar(255) NOT NULL,
    gender varchar(255) NOT NULL,
    age int NOT NULL,
    weight decimal (6,2) NOT NULL,
    height decimal (2,1) NOT NULL, 
    waistSize decimal (4,2) NOT NULL,
    activityLevel decimal (4,3) NOT NULL, 
    fatPercentage decimal (4,2),
    RMR decimal (7,2), 
    caloriesPerDay decimal (7,2),
    input_date timestamp not null default now(),
    PRIMARY KEY (id)
);

CREATE TABLE user_data(
    id int auto_increment NOT NULL,
    user_name varchar(255) NOT NULL,
    food varchar(255) NOT NULL,
    calories int NOT NULL,
    serving int NOT NULL,
    input_date timestamp not null default now(),
    PRIMARY KEY (id)
);