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
INSERT INTO books(title, author, image, description, price, status )VALUES ('Chike and the River', 'Chinua Achebe', 'https://folioreview.files.wordpress.com/2020/04/f21df8d465645236f369031b1dda8746.jpg', 'lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 500.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Sugar Girl', 'Kola Onadipe', 'https://continentalbooksgh.com/wp-content/uploads/2020/05/Sugar-Girl.jpg','lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 5000.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Without a Silver Spoon', 'Eddie Iroh', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347325638l/2301365.jpg','lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 7000.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('The African Child', 'Camera Laye', 'https://tothebalcony.files.wordpress.com/2012/08/africanchild1.jpg?w=584', 'lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 5000.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('The Concubine', 'Amadin Elechi', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1281647970l/1199163.jpg', 'lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 5000.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('Half of a Yellow Sun', 'Chimamanda Adieche', 'https://farafinabooks.files.wordpress.com/2013/04/half-of-a-yellow-sun.jpg', 'lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 1000.0, 'available');
INSERT INTO books(title, author, image, description, price, status )VALUES ('There was a Country', 'Chinua Achebe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSZI4k6afyB1AUj8OR74jFcsaYr2E6NkHLg&usqp=CAU', 'lorem jsdsh ikkkad hhjkjaa jkhjsks jkhsk js jusuhds ggtgywjhws n lorem djsjds loejh jklsdj kjsdjksdshn nf ndjh', 8000.0, 'available');
