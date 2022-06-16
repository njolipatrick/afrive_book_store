/* Replace with your SQL commands */
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    book_id integer REFERENCES books (id) ON DELETE CASCADE,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);