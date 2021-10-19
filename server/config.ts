import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

const BASE_CONFIG = {
  APP_HOST: env.APP_HOST || 'localhost',
  APP_PORT: Number(env.APP_PORT) || 8000,

  DB_NAME: env.DB_NAME,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
};

const TESTING_CONFIG = {
  ...BASE_CONFIG,
  DB_NAME: `test_${env.DB_NAME}`,
};

const DEVELOPMENT_CONFIG = { ...BASE_CONFIG };

const PRODUCTION_CONFIG = { ...BASE_CONFIG };

export type Environments = 'test' | 'development' | 'production';

const getConfig = (environment: Environments) => {
  if (environment === 'test') {
    return TESTING_CONFIG;
  }
  if (environment === 'development') {
    return DEVELOPMENT_CONFIG;
  }
  return PRODUCTION_CONFIG;
};

export default getConfig(env.NODE_ENV as Environments);
