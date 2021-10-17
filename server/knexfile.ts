import path from 'path';

export default {
  // knex config
  migrations: {
    directory: path.resolve(__dirname, './database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, './database/seeds'),
  },
};
