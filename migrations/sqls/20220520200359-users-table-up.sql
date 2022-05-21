/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(50) UNIQUE,
    role VARCHAR(10),
    password VARCHAR(100),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);