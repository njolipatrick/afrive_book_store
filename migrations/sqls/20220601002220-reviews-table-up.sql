/* Replace with your SQL commands */
CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    comment VARCHAR(50),
    rate integer,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    book_id integer REFERENCES books (id) ON DELETE CASCADE, 
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

INSERT INTO reviews(comment, rate, user_id, book_id)VALUES ('COOL book', 5, 1, 6);
INSERT INTO reviews(comment, rate, user_id, book_id)VALUES ('Awecome book', 3, 1, 7);
INSERT INTO reviews(comment, rate, user_id, book_id)VALUES ('nICE book', 4, 1, 3);
