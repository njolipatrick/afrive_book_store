/* Replace with your SQL commands */
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    ISBN VARCHAR(100) UNIQUE,
    author VARCHAR(50) UNIQUE,
    publisher VARCHAR(100),
    genre VARCHAR(100),
    category VARCHAR(100), 
    image_link VARCHAR(255),
    description VARCHAR(255),
    price float,
    hasEbook Boolean,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

