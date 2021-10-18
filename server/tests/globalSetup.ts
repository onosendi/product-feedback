import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ts-node/register';

dotenv.config();

const { env } = process;

const createTestDatabase = async () => {
  const db = knex({
    client: 'pg',
    connection: {
      password: env.DB_PASSWORD,
      user: env.DB_USER,
    },
  });

  try {
    await db.raw(`drop database if exists test_${env.DB_NAME}`);
    await db.raw(`create database test_${env.DB_NAME}`);
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
      database: 'test_productfeedback',
      password: env.DB_PASSWORD,
      user: env.DB_USER,
    },
    migrations: {
      directory: path.resolve(__dirname, '../database/migrations'),
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
