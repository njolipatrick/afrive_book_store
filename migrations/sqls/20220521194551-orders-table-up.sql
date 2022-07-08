/* Replace with your SQL commands */
CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE, 
  txn_ref VARCHAR(255) NOT NULL,
  total_order_amount VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  estimated_delivery_date VARCHAR(255) NOT NULL,
  currency VARCHAR(255) NOT NULL,
  checkout_url VARCHAR(255) NOT NULL,
  book json,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);
-- INSERT INTO orders VALUES 
-- (100, 'AFRIVE-2945867894857867478499', 15000, 'Processing for Delivery', '2022-07-04T16:13:53.982Z', 'NGN', '[{"bookName": "Without a Silver Spoon","quantity": 1,"totalAmount": 7000,"format": "Hard Copy"},{"bookName": "Without a Silver Spoon","quantity": 1,
-- "totalAmount": 7000,"format": "Hard Copy"}]');