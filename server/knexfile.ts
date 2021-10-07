import path from 'path';

import config from './src/config';

export default {
  ...config.database,
  migrations: {
    directory: path.resolve(__dirname, './database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, './database/seeds'),
  },
};
