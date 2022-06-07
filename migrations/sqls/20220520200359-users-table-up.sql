/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(50) UNIQUE,
    phone VARCHAR(20),
    avatar VARCHAR(255),
    isVerified boolean,
    role VARCHAR(10),
    verification_token VARCHAR(255),
    password VARCHAR(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Njoli Patrick', 'ogmaro', 'ogmaro@gmail.com', '2348031370465', true, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Timothy Patrick', 'mothy', 'imothy@gmail.com', '2348031370465', false, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Josuah Patrick', 'suah', 'trick@gmail.com', '2348031370465', false, 'admin', 'password');
