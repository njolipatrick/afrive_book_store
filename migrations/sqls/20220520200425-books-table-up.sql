/* Replace with your SQL commands */
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100), 
    author VARCHAR(50) UNIQUE,
    image VARCHAR(255), 
    description VARCHAR(255),
    price float,
    status VARCHAR(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick1', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick2', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick3', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick4', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick5', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick6', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick7', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick8', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick9', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli Patrick0', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli1 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli2 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli3 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli4 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli5 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli6 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli7 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli8 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli9 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli0 Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 1Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 2Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 3Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 4Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 5Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 6Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 7Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 8Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 9Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Tales By MoonLight', 'Njoli 0Patrick', 'https://ibb.co/z4Q4L1N', 'this is a new book', 500.0, 'available');

