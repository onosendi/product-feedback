import camelCaseKeys from 'camelcase-keys';
import type { Knex } from 'knex';
import path from 'path';

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
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  };

  if (includeDatabaseName) {
    connection.database = process.env.DB_NAME;
  }

  return {
    client: 'pg',
    connection,
    migrations: {
      directory: path.resolve(__dirname, '../../database/migrations'),
    },
    postProcessResponse: (response: Knex) => camelCaseKeys(response, { deep: true }),
    seeds: {
      directory: path.resolve(__dirname, '../../database/seeds'),
    },
    debug: process.env.DB_DEBUG === 'true',
  };
};

export default getKnexConfig;
