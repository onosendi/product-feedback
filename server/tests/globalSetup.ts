import Knex from 'knex';
import config from '../config';
import getKnexConfig from '../knexfile';
import 'ts-node/register';

const createTestDatabase = async () => {
  const knexConfig = getKnexConfig({ includeDatabaseName: false });
  const knex = Knex(knexConfig);

  try {
    await knex.raw(`drop database if exists ${config.DB_NAME}`);
    await knex.raw(`create database ${config.DB_NAME}`);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
};

const migrateAndSeedTestDatabase = async () => {
  const knexConfig = getKnexConfig();
  const knex = Knex(knexConfig);

  try {
    await knex.migrate.latest();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
};

const setup = async () => {
  try {
    await createTestDatabase();
    await migrateAndSeedTestDatabase();
    // eslint-disable-next-line no-console
    console.log('\n\nTest database created successfully\n');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(1);
  }
};

export default setup;
