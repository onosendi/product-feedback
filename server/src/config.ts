import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export default {
  cors: {
    origin: [
      'http://192.168.1.4:3000',
      'http://192.168.1.6:3000',
      'https://product-feedback.dlindegren.com',
    ],
  },
  database: {
    client: 'pg',
    connection: {
      database: env.DB_NAME,
      host: env.DB_HOST || 'localhost',
      password: env.DB_PASSWORD,
      user: env.DB_USER,
    },
    debug: env.DB_DEBUG === 'true' || false,
  },
  env: env.NODE_ENV || 'development',
  ip: env.APP_IP || 'localhost',
  port: env.APP_PORT || 3000,
  secret: env.APP_SECRET,
  token: {
    algorithm: 'HS256',
  },
};
