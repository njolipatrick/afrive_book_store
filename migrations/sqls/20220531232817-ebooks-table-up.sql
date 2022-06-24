/* Replace with your SQL commands */
CREATE TABLE ebooks(
    id SERIAL PRIMARY KEY,
    status Boolean,
    format VARCHAR(50),
    book_id integer REFERENCES books (id) ON DELETE CASCADE,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', '1');
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', '2');
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', '3');  
