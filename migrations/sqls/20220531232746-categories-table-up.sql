/* Replace with your SQL commands */
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    book_id integer REFERENCES books (id) ON DELETE CASCADE,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

INSERT INTO categories(name, book_id )VALUES ('Fiction', 1);
INSERT INTO categories(name, book_id )VALUES ('Action', 2);
INSERT INTO categories(name, book_id )VALUES ('Philosophy', 3);
INSERT INTO categories(name, book_id )VALUES ('Non-fiction', 4);
INSERT INTO categories(name, book_id )VALUES ('Fantasy', 5);
INSERT INTO categories(name, book_id )VALUES ('Thriller', 6);
INSERT INTO categories(name, book_id )VALUES ('Drama', 6);
INSERT INTO categories(name, book_id )VALUES ('Horror', 7);
INSERT INTO categories(name, book_id )VALUES ('Self-help', 1);
INSERT INTO categories(name, book_id )VALUES ('Poetry', 2);
INSERT INTO categories(name, book_id )VALUES ('Children', 3);
INSERT INTO categories(name, book_id )VALUES ('Satire', 4);
INSERT INTO categories(name, book_id )VALUES ('Romance', 5);
INSERT INTO categories(name, book_id )VALUES ('Autobiography', 6);
INSERT INTO categories(name, book_id )VALUES ('Adventure', 7);
