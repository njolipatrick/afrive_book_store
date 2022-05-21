/* Replace with your SQL commands */
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    ISBN VARCHAR(100) UNIQUE,
    author VARCHAR(50) UNIQUE,
    publisher VARCHAR(10),
    genre VARCHAR(100),
    category VARCHAR(100), 
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);