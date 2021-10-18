import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { env } = process;

export default {
  client: 'pg',
  connection: {
    database: env.DB_NAME,
    pasword: env.DB_PASSWORD,
    user: env.DB_USER,
  },
  migrations: {
    directory: path.resolve(__dirname, './database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, './database/seeds'),
  },
};
