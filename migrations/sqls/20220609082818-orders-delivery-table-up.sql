/* Replace with your SQL commands */
CREATE TABLE orders_delivery (
  id serial PRIMARY KEY,    
  order_id INTEGER REFERENCES orders (id) ON DELETE CASCADE,
  phone INTEGER,
  delivery_address VARCHAR(255),
  date_delivered timestamp,
  is_delivered BOOLEAN NOT NULL,/*set to true when delivery is complete*/
  download_link VARCHAR(255),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);