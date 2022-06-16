/* Replace with your SQL commands */
CREATE TABLE orders (
  id serial PRIMARY KEY,    
  book_id INTEGER REFERENCES books (id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);