import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';
import foo from '../src/lib/knex';
import 'ts-node/register';

dotenv.config();
const { env } = process;
const testDatabaseName = `testing_${env.DB_NAME}`;

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
  try {
    await foo.migrate.latest();
  } catch (error: any) {
    throw new Error(error);
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
