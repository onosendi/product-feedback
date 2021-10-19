import camelCaseKeys from 'camelcase-keys';
import { Knex } from 'knex';
import path from 'path';
import config from './config';

type GetKnexConfig = {
  includeDatabaseName?: boolean,
};

const getKnexConfig = (args: GetKnexConfig = {}): Knex.Config => {
  const { includeDatabaseName = true } = args;
  const connection: {
    password: string | undefined,
    user: string | undefined,
    database?: string,
  } = {
    password: config.DB_PASSWORD,
    user: config.DB_USER,
  };

  if (includeDatabaseName) {
    connection.database = config.DB_NAME;
  }

  return {
    client: 'pg',
    connection,
    migrations: {
      directory: path.resolve(__dirname, './database/migrations'),
    },
    postProcessResponse: (response: Knex) => camelCaseKeys(response, { deep: true }),
    seeds: {
      directory: path.resolve(__dirname, './database/seeds'),
    },
  };
};

export default getKnexConfig;
