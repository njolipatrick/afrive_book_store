/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(50) UNIQUE, 
    isVerified boolean,
    role VARCHAR(10),
    verification_token VARCHAR(255),
    password VARCHAR(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

INSERT INTO users(firstname, lastname, username, email, isVerified, role, password)VALUES ('Josuah',' Patrick', 'suah', 'trick@gmail.com', false, 'user', 'password');
INSERT INTO users(firstname, lastname, username, email, isVerified, role, password)VALUES ('Josuah',' Patrick', 'suah1', 't1rick@gmail.com', false, 'user', 'password');
