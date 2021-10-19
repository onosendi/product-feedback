import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';
import 'ts-node/register';

dotenv.config();
const { env } = process;
const testDatabaseName = `test_${env.DB_NAME}`;

const createTestDatabase = async () => {
  const db = knex({
    client: 'pg',
    connection: {
      password: env.DB_PASSWORD,
      user: env.DB_USER,
    },
  });

  try {
    await db.raw(`drop database if exists ${testDatabaseName}`);
    await db.raw(`create database ${testDatabaseName}`);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await db.destroy();
  }
};

const migrateAndSeedTestDatabase = async () => {
  const db = knex({
    client: 'pg',
    connection: {
      database: testDatabaseName,
      password: env.DB_PASSWORD,
      user: env.DB_USER,
    },
    migrations: {
      directory: path.resolve(__dirname, '../database/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, '../database/seeds'),
    },
  });

  try {
    await db.migrate.latest();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await db.destroy();
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
