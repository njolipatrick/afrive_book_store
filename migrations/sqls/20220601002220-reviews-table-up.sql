/* Replace with your SQL commands */
CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    status Boolean,
    review VARCHAR(50),
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    book_id integer REFERENCES books (id) ON DELETE CASCADE, 
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);