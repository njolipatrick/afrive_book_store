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
INSERT INTO categories(name, book_id )VALUES ('Fiction', 3);
INSERT INTO categories(name, book_id )VALUES ('Action', 5);
INSERT INTO categories(name, book_id )VALUES ('Philosophy', 4);
INSERT INTO categories(name, book_id )VALUES ('Non-fiction', 6);
INSERT INTO categories(name, book_id )VALUES ('Fantasy', 7);
INSERT INTO categories(name, book_id )VALUES ('Thriller', 8);
INSERT INTO categories(name, book_id )VALUES ('Drama', 9);
INSERT INTO categories(name, book_id )VALUES ('Horror', 1);
INSERT INTO categories(name, book_id )VALUES ('Self-help', 4);
INSERT INTO categories(name, book_id )VALUES ('Poetry', 6);
INSERT INTO categories(name, book_id )VALUES ('Children', 11);
INSERT INTO categories(name, book_id )VALUES ('Satire', 12);
INSERT INTO categories(name, book_id )VALUES ('Romance', 13);
INSERT INTO categories(name, book_id )VALUES ('Autobiography',14);
INSERT INTO categories(name, book_id )VALUES ('Adventure', 13);
INSERT INTO categories(name, book_id )VALUES ('Fiction', 16);
INSERT INTO categories(name, book_id )VALUES ('Action', 17);
INSERT INTO categories(name, book_id )VALUES ('Philosophy', 18);
INSERT INTO categories(name, book_id )VALUES ('Non-fiction', 19);
INSERT INTO categories(name, book_id )VALUES ('Fantasy', 20);
INSERT INTO categories(name, book_id )VALUES ('Thriller', 16);
INSERT INTO categories(name, book_id )VALUES ('Drama', 20);
INSERT INTO categories(name, book_id )VALUES ('Horror', 20);
INSERT INTO categories(name, book_id )VALUES ('Self-help', 19);
INSERT INTO categories(name, book_id )VALUES ('Poetry', 18);
INSERT INTO categories(name, book_id )VALUES ('Children', 13);
INSERT INTO categories(name, book_id )VALUES ('Satire', 17);
INSERT INTO categories(name, book_id )VALUES ('Romance', 14);
INSERT INTO categories(name, book_id )VALUES ('Autobiography',16);
INSERT INTO categories(name, book_id )VALUES ('Adventure', 15);
