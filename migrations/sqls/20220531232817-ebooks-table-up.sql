/* Replace with your SQL commands */
CREATE TABLE ebooks(
    id SERIAL PRIMARY KEY,
    status Boolean,
    format VARCHAR(50),
    book_id integer REFERENCES books (id) ON DELETE CASCADE,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', 1);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 2);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 3);  
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', 4);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 5);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 6);  
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', 7);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 8);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 9);  
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', 10);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 12);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 13);  
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', 14);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 15);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 16);  
INSERT INTO ebooks(status, format, book_id )VALUES (true, 'pdf', 17);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 19);
INSERT INTO ebooks(status, format, book_id )VALUES (false, 'pdf', 18);  
