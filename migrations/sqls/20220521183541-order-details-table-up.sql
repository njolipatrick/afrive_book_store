/* Replace with your SQL commands */
CREATE TABLE order_details (
  id serial PRIMARY KEY,    
  quantity INTEGER NOT NULL,
  order_id integer REFERENCES orders (id) ON DELETE CASCADE,
  book_id integer REFERENCES orders (id) ON DELETE CASCADE,
  user_id integer REFERENCES orders (id) ON DELETE CASCADE,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);


