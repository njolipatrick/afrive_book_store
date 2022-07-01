/* Replace with your SQL commands */
CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    book_id integer REFERENCES books (id) ON DELETE CASCADE, 
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);