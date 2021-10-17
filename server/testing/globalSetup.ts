import knex from 'knex';
import config from '../src/config';
import knexfile from '../knexfile';

const foo = async () => {
  const knexConfig = { ...knexfile };
  delete knexConfig.connection.database;
  const db = knex(knexConfig);

  try {
    await db.raw(`drop database if exists ${config.testDatabase}`);
    await db.raw(`create database ${config.testDatabase}`);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await db.destroy();
  }
};

const bar = async () => {
  const knexConfig = { ...knexfile };
  knexConfig.connection.database = config.testDatabase;
  const db = knex(knexConfig);

  try {
    await db.migrate.latest();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await db.destroy();
  }
};

export default async () => {
  try {
    await foo();
    await bar();
    console.log('\n\nTest database created successfully\n');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
