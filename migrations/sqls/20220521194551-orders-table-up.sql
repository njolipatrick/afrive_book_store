/* Replace with your SQL commands */
CREATE TABLE orders (
  id serial PRIMARY KEY,    
  book_id integer REFERENCES orders (id) ON DELETE CASCADE,
  user_id integer REFERENCES orders (id) ON DELETE CASCADE,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

