-- PostgreSQL Schema Migration for VanMate

DROP TABLE IF EXISTS admin_details CASCADE;
CREATE TABLE admin_details (
    Id VARCHAR(45) NOT NULL PRIMARY KEY,
    Pass VARCHAR(45) NOT NULL,
    Name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL
);

DROP TABLE IF EXISTS assign_vehicle CASCADE;
CREATE TABLE assign_vehicle (
    assignid SERIAL PRIMARY KEY,
    vehicleno VARCHAR(45) NOT NULL,
    driverid INT NOT NULL
);

DROP TABLE IF EXISTS booking_request CASCADE;
CREATE TABLE booking_request (
    requestid SERIAL PRIMARY KEY,
    userid VARCHAR(45) NOT NULL,
    vehicletype VARCHAR(45) NOT NULL,
    source VARCHAR(45) NOT NULL,
    destination VARCHAR(45) NOT NULL,
    timing VARCHAR(45) NOT NULL,
    no_students INT NOT NULL,
    status VARCHAR(45) DEFAULT NULL
);

DROP TABLE IF EXISTS driver_details CASCADE;
CREATE TABLE driver_details (
    id SERIAL PRIMARY KEY,
    dname VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    experience VARCHAR(45) NOT NULL,
    licenseno VARCHAR(45) NOT NULL,
    validity DATE NOT NULL,
    address VARCHAR(150) NOT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    date DATE NOT NULL,
    vehicle_number VARCHAR(45) DEFAULT NULL
);

DROP TABLE IF EXISTS feedback CASCADE;
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(45) DEFAULT NULL,
    feedback_text VARCHAR(255) NOT NULL,
    rating VARCHAR(6) NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message (
    messageid SERIAL PRIMARY KEY,
    senderid VARCHAR(45) NOT NULL,
    receiverid VARCHAR(45) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message_text VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    sstatus VARCHAR(10) NOT NULL,
    rstatus VARCHAR(10) NOT NULL
);

DROP TABLE IF EXISTS notice CASCADE;
CREATE TABLE notice (
    noticeid SERIAL PRIMARY KEY,
    topic VARCHAR(45) NOT NULL,
    contents VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS parent CASCADE;
CREATE TABLE parent (
    id VARCHAR(45) NOT NULL PRIMARY KEY,
    password VARCHAR(45) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    city VARCHAR(45) NOT NULL,
    address VARCHAR(100) NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS school CASCADE;
CREATE TABLE school (
    id VARCHAR(45) NOT NULL PRIMARY KEY,
    password VARCHAR(45) NOT NULL,
    sname VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    board VARCHAR(45) NOT NULL,
    city VARCHAR(45) NOT NULL,
    owner VARCHAR(45) NOT NULL,
    address VARCHAR(100) NOT NULL,
    stype VARCHAR(45) NOT NULL,
    date DATE NOT NULL,
    latitude DECIMAL(10,6) DEFAULT NULL,
    longitude DECIMAL(11,6) DEFAULT NULL
);

DROP TABLE IF EXISTS student_details CASCADE;
CREATE TABLE student_details (
    stid SERIAL PRIMARY KEY,
    student_name VARCHAR(60) NOT NULL,
    standard VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    school_name VARCHAR(75) NOT NULL,
    userid VARCHAR(45) NOT NULL,
    status VARCHAR(45) DEFAULT NULL,
    requestid VARCHAR(45) DEFAULT NULL,
    vehicle_number VARCHAR(45) DEFAULT NULL
);

DROP TABLE IF EXISTS transaction CASCADE;
CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(45) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    charge INT NOT NULL,
    transactionid VARCHAR(45) DEFAULT NULL,
    requestid INT DEFAULT NULL
);

DROP TABLE IF EXISTS user_query CASCADE;
CREATE TABLE user_query (
    serial_number SERIAL PRIMARY KEY,
    user_name VARCHAR(45) NOT NULL,
    user_email VARCHAR(45) NOT NULL,
    user_phone VARCHAR(45) DEFAULT NULL,
    user_doubt VARCHAR(45) NOT NULL,
    date DATE NOT NULL
);

DROP TABLE IF EXISTS vehicle_charges CASCADE;
CREATE TABLE vehicle_charges (
    id SERIAL PRIMARY KEY,
    vehicle_type VARCHAR(45) NOT NULL,
    charge INT NOT NULL,
    description VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS vehicle_details CASCADE;
CREATE TABLE vehicle_details (
    vehicle_type VARCHAR(45) NOT NULL,
    vehicle_number VARCHAR(45) NOT NULL PRIMARY KEY,
    vehicle_description VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(45) DEFAULT NULL,
    device_id VARCHAR(45) DEFAULT NULL
);
