/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(50) UNIQUE,
    phone VARCHAR(20),
    isVerified boolean,
    role VARCHAR(10),
    verification_token VARCHAR(255),
    password VARCHAR(100),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Njoli Patrick', 'ogmaro', 'ogmaro@gmail.com', '2348031370465', true, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Timothy Patrick', 'mothy', 'imothy@gmail.com', '2348031370465', false, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Josuah Patrick', 'suah', 'trick@gmail.com', '2348031370465', false, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Njoli Faith', 'joli', 'Faith@gmail.com', '2348031370465', false, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Njoli Pamela', 'mela', 'mela@gmail.com', '2348031370465', false, 'user', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Jelilh Patrick', 'elilh', 'elilh@gmail.com', '2348031370465', false, 'admin', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Njoli Timothy', 'othy', 'othy@gmail.com', '2348031370465', false, 'user', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Break Patrick', 'reak', 'reak@gmail.com', '2348031370465', false, 'user', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Darkny Patrick', 'arkn', 'arkn@gmail.com', '2348031370465', false, 'user', 'password');
INSERT INTO users(fullname, username, email, phone, isVerified, role, password)VALUES ('Njoli Raket', 'aket', 'aket@gmail.com', '2348031370465', false, 'user', 'password');
