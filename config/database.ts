import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV, DATABASE_URL
} = process.env;

let client: Pool;

if (NODE_ENV === 'production') {
  console.log('::server in production mode');
  const connectionString = String(DATABASE_URL);
  client = new Pool({
    connectionString
  });
} else if (NODE_ENV === 'test') {
  console.log('::server in test mode');
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5431
  });
} else {
  console.log('::server in developer mode');
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DEV_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5431
  });
}

export default client;
